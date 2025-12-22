import { Request, Response, NextFunction } from 'express';
import { Task } from '../models/Task.model';
import { NotFoundError } from '../middleware/error.middleware';

export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.user?.userId,
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tasks = await Task.find({ userId: req.user?.userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user?.userId,
    });

    if (!task) {
      throw new NotFoundError('Task');
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      throw new NotFoundError('Task');
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?.userId,
    });

    if (!task) {
      throw new NotFoundError('Task');
    }

    res.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
