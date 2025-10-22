import express from 'express';
import Task from '../models/Task';
import { anonymousUserMiddleware } from '../middleware/userMiddlware';

const router = express.Router();

router.get('/tasks',anonymousUserMiddleware, async (req, res) => {
  try {
    const { userId } = req.query;
    console.log('userId:', userId);
    const query = userId ? { userId } : {};
    const _tasks = await Task.find(query);
    console.log('_tasks:', _tasks);
    const tasks = await Task.find(query).populate('userId', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

router.post('/tasks', async (req, res) => {
  try {
    const { title, description, level, userId } = req.body;
    const task = new Task({ title, description, level, userId });
    await task.save();
    const populatedTask = await Task.findById(task._id).populate('userId', 'name email');
    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task' });
  }
});
router.put('/tasks' ,async (req, res))
router.patch('/tasks/:id', async (req, res) => {
  try {
    const { done, title, description, level } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { done, title, description, level },
      { new: true }
    ).populate('userId', 'name email');

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update task' });
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

router.get('/users/:userId/tasks', anonymousUserMiddleware, async (req, res) => {
  try {
    const _tasks = await Task.find({ userId: req.params.userId }).populate('userId', 'name email');
    console.log('_tasks for user:', _tasks);
    const tasks = await Task.find({ userId: req.params.userId }).populate('userId', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user tasks' });
  }
});

export default router;
