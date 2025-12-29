import { Request, Response } from 'express';
import User from '../models/User';
import Room from '../models/Room';
import { generateToken } from '../utils/jwt';
import { AuthRequest } from '../middleware/auth';

export const checkUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.body;

    if (!username || username.trim().length < 3) {
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

    res.status(isNewUser ? 201 : 200).json(responsePayload);
  } catch (error: any) {
    console.error('[AUTH] Error in checkUser:', error);
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
    if (!req.user) {
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
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    // CRITICAL FIX: If user has no currentRoom, assign the first room
    if (!user.currentRoom) {
      const firstRoom = await Room.findOne().sort({ createdAt: 1 });

      if (firstRoom) {
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          { currentRoom: firstRoom._id },
          { new: true }
        ).populate('currentRoom').exec();

        if (updatedUser) {
          user = updatedUser;
        }
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

    res.status(200).json(responsePayload);
  } catch (error) {
    console.error('[AUTH] Error in getCurrentUser:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching user data'
    });
  }
};
