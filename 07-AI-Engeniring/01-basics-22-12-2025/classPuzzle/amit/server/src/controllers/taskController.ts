import { Response } from 'express';
import Task from '../models/Task.js';
import { AuthRequest } from '../middleware/auth.js';

export const getAllTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { search, priority } = req.query;

    // Build query
    const query: any = {
      user_id: req.userId,
      deleted_at: null,
    };

    // Add search filter
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Add priority filter with validation
    if (priority) {
      if (!['low', 'medium', 'high'].includes(priority as string)) {
        res.status(400).json({ message: 'Invalid priority value. Must be low, medium, or high' });
        return;
      }
      query.priority = priority;
    }

    const tasks = await Task.find(query).sort({ due_date: 1, createdAt: -1 });

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
};

export const getTaskById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id || id.length !== 24) {
      res.status(400).json({ message: 'Invalid task ID format' });
      return;
    }

    const task = await Task.findOne({
      _id: id,
      user_id: req.userId,
      deleted_at: null,
    });

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching task' });
  }
};

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, priority, due_date, status } = req.body;

    // Validation
    if (!title || title.trim().length === 0) {
      res.status(400).json({ message: 'Title is required and cannot be empty' });
      return;
    }

    if (title.trim().length > 200) {
      res.status(400).json({ message: 'Title must be less than 200 characters' });
      return;
    }

    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      res.status(400).json({ message: 'Priority must be low, medium, or high' });
      return;
    }

    if (due_date) {
      const dueDate = new Date(due_date);
      if (isNaN(dueDate.getTime())) {
        res.status(400).json({ message: 'Invalid due date format' });
        return;
      }
    }

    if (status !== undefined && typeof status !== 'boolean') {
      res.status(400).json({ message: 'Status must be a boolean value' });
      return;
    }

    const task = await Task.create({
      user_id: req.userId,
      title: title.trim(),
      description: description || '',
      priority: priority || 'medium',
      due_date: due_date || null,
      status: status || false,
    });

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating task' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, priority, due_date, status } = req.body;

    // Validate ID format
    if (!id || id.length !== 24) {
      res.status(400).json({ message: 'Invalid task ID format' });
      return;
    }

    // Validation
    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim().length === 0) {
        res.status(400).json({ message: 'Title cannot be empty' });
        return;
      }
      if (title.trim().length > 200) {
        res.status(400).json({ message: 'Title must be less than 200 characters' });
        return;
      }
    }

    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      res.status(400).json({ message: 'Priority must be low, medium, or high' });
      return;
    }

    if (due_date !== undefined && due_date !== null) {
      const dueDate = new Date(due_date);
      if (isNaN(dueDate.getTime())) {
        res.status(400).json({ message: 'Invalid due date format' });
        return;
      }
    }

    if (status !== undefined && typeof status !== 'boolean') {
      res.status(400).json({ message: 'Status must be a boolean value' });
      return;
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description;
    if (priority !== undefined) updateData.priority = priority;
    if (due_date !== undefined) updateData.due_date = due_date;
    if (status !== undefined) updateData.status = status;

    const task = await Task.findOneAndUpdate(
      { _id: id, user_id: req.userId, deleted_at: null },
      updateData,
      { new: true, runValidators: true }
    );

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating task' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id || id.length !== 24) {
      res.status(400).json({ message: 'Invalid task ID format' });
      return;
    }

    const task = await Task.findOneAndUpdate(
      { _id: id, user_id: req.userId, deleted_at: null },
      { deleted_at: new Date() },
      { new: true }
    );

    if (!task) {
      res.status(404).json({ message: 'Task not found or already deleted' });
      return;
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting task' });
  }
};
