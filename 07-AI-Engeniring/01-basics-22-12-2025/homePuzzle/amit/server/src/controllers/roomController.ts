import { Request, Response } from 'express';
import Room from '../models/Room';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

export const getRoomById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    console.log(`[ROOM CONTROLLER] Fetching room with ID: ${id}`);

    const room = await Room.findById(id).populate('puzzles').exec();

    if (!room) {
      console.log(`[ROOM CONTROLLER] Room not found: ${id}`);
      res.status(404).json({
        success: false,
        message: 'Room not found'
      });
      return;
    }

    console.log(`[ROOM CONTROLLER] Successfully fetched room: ${room.title}`);
    console.log(`[ROOM CONTROLLER] Room has ${room.puzzles.length} puzzles`);

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
    console.error(`[ROOM CONTROLLER] Error fetching room:`, error);
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
    console.log(`[ROOM CONTROLLER] movePlayer called. userId: ${userId}, targetRoomId: ${roomId}`);

    if (!userId) {
      console.log('[ROOM CONTROLLER] ❌ No userId - not authenticated');
      res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
      return;
    }

    const room = await Room.findById(roomId).populate('puzzles').exec();
    if (!room) {
      console.log(`[ROOM CONTROLLER] ❌ Room not found: ${roomId}`);
      res.status(404).json({
        success: false,
        message: 'Room not found'
      });
      return;
    }

    console.log(`[ROOM CONTROLLER] ✅ Target room found: ${room.title}`);

    const user = await User.findByIdAndUpdate(
      userId,
      { currentRoom: roomId },
      { new: true }
    ).populate('currentRoom').exec();

    console.log(`[ROOM CONTROLLER] ✅ User moved to room: ${user?.currentRoom}`);

    const responsePayload = {
      success: true,
      user: {
        currentRoom: user?.currentRoom
      }
    };

    console.log('[ROOM CONTROLLER] Sending movePlayer response:', responsePayload);
    res.status(200).json(responsePayload);
  } catch (error) {
    console.error('[ROOM CONTROLLER] ❌ Error in movePlayer:', error);
    res.status(500).json({
      success: false,
      message: 'Server error moving player'
    });
  }
};
