import { Request, Response } from 'express';
import User from '../models/User';
import Room from '../models/Room';
import { generateToken } from '../utils/jwt';
import { AuthRequest } from '../middleware/auth';

export const checkUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.body;
    console.log(`[AUTH] checkUser called with username: "${username}"`);

    if (!username || username.trim().length < 3) {
      console.log('[AUTH] ❌ Username too short');
      res.status(400).json({
        success: false,
        message: 'Username must be at least 3 characters long'
      });
      return;
    }

    let user = await User.findOne({ username: username.trim() })
      .populate('currentRoom')
      .exec();

    let isNewUser = false;

    if (!user) {
      // Find the first room (Initialization Chamber) for new users
      const firstRoom = await Room.findOne().sort({ createdAt: 1 });
      console.log(`[AUTH] 🆕 New user "${username.trim()}"`);
      console.log(`[AUTH] First room found: ${firstRoom?.title} (ID: ${firstRoom?._id})`);

      user = await User.create({
        username: username.trim(),
        currentRoom: firstRoom?._id || null,
        score: 0,
        inventory: [],
        completedPuzzles: [],
        gameStats: {
          totalPlayTime: 0,
          puzzlesSolved: 0,
          moralityChoices: {
            good: 0,
            neutral: 0,
            bad: 0
          },
          secretsFound: 0,
          gameCompleted: false
        }
      });
      isNewUser = true;

      // Populate the room for response
      await user.populate('currentRoom');
      console.log(`[AUTH] ✅ User created successfully`);
      console.log(`[AUTH] Populated currentRoom:`, user.currentRoom);
    } else {
      console.log(`[AUTH] ✅ Existing user "${username.trim()}" logged in`);
      console.log(`[AUTH] Current room:`, user.currentRoom);
    }

    const token = generateToken({
      userId: user._id.toString(),
      username: user.username
    });

    const responsePayload = {
      success: true,
      isNewUser,
      token,
      user: {
        id: user._id,
        username: user.username,
        currentRoom: user.currentRoom,
        score: user.score,
        inventory: user.inventory,
        completedPuzzles: user.completedPuzzles
      }
    };

    console.log(`[AUTH] Sending response with currentRoom:`, responsePayload.user.currentRoom);
    res.status(isNewUser ? 201 : 200).json(responsePayload);
  } catch (error: any) {
    console.error('[AUTH] ❌ Error in checkUser:', error);
    if (error.code === 11000) {
      res.status(409).json({
        success: false,
        message: 'Username already exists'
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Server error during authentication'
    });
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    console.log('[AUTH] getCurrentUser called');
    console.log('[AUTH] req.user:', req.user);

    if (!req.user) {
      console.log('[AUTH] ❌ No user in request');
      res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
      return;
    }

    let user = await User.findById(req.user.userId)
      .populate('currentRoom')
      .populate('inventory')
      .exec();

    if (!user) {
      console.log('[AUTH] ❌ User not found in database');
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    console.log('[AUTH] ✅ User found:', user.username);
    console.log('[AUTH] User currentRoom before check:', user.currentRoom);

    // CRITICAL FIX: If user has no currentRoom, assign the first room
    if (!user.currentRoom) {
      console.log('[AUTH] ⚠️ User has no currentRoom! Assigning first room...');
      const firstRoom = await Room.findOne().sort({ createdAt: 1 });

      if (firstRoom) {
        console.log(`[AUTH] First room found: ${firstRoom.title} (${firstRoom._id})`);
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          { currentRoom: firstRoom._id },
          { new: true }
        ).populate('currentRoom').exec();

        if (updatedUser) {
          user = updatedUser;
          console.log('[AUTH] ✅ User currentRoom updated:', user.currentRoom);
        }
      } else {
        console.log('[AUTH] ❌ No rooms found in database!');
      }
    }

    const responsePayload = {
      success: true,
      user: {
        id: user._id,
        username: user.username,
        currentRoom: user.currentRoom,
        score: user.score,
        inventory: user.inventory,
        completedPuzzles: user.completedPuzzles
      }
    };

    console.log('[AUTH] Sending getCurrentUser response with room:', responsePayload.user.currentRoom);
    res.status(200).json(responsePayload);
  } catch (error) {
    console.error('[AUTH] ❌ Error in getCurrentUser:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching user data'
    });
  }
};
