import { Request, Response } from 'express';
import Room from '../models/Room';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

export const getRoomById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const room = await Room.findById(id).populate('puzzles').exec();

    if (!room) {
      res.status(404).json({
        success: false,
        message: 'Room not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      room: {
        _id: room._id,
        title: room.title,
        description: room.description,
        imageAsset: room.imageAsset,
        connections: room.connections,
        puzzles: room.puzzles
      }
    });
  } catch (error) {
    console.error('[ROOM] Error fetching room:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching room data'
    });
  }
};

export const movePlayer = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { roomId } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
      return;
    }

    const room = await Room.findById(roomId).populate('puzzles').exec();
    if (!room) {
      res.status(404).json({
        success: false,
        message: 'Room not found'
      });
      return;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { currentRoom: roomId },
      { new: true }
    ).populate('currentRoom').exec();

    const responsePayload = {
      success: true,
      user: {
        currentRoom: user?.currentRoom
      }
    };

    res.status(200).json(responsePayload);
  } catch (error) {
    console.error('[ROOM] Error in movePlayer:', error);
    res.status(500).json({
      success: false,
      message: 'Server error moving player'
    });
  }
};
