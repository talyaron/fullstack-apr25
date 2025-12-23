import { Request, Response } from 'express';
import User from '../models/User';
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
      user = await User.create({
        username: username.trim(),
        score: 0,
        inventory: [],
        completedPuzzles: []
      });
      isNewUser = true;
    }

    const token = generateToken({
      userId: user._id.toString(),
      username: user.username
    });

    res.status(isNewUser ? 201 : 200).json({
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
    });
  } catch (error: any) {
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

    const user = await User.findById(req.user.userId)
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

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        currentRoom: user.currentRoom,
        score: user.score,
        inventory: user.inventory,
        completedPuzzles: user.completedPuzzles
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching user data'
    });
  }
};
