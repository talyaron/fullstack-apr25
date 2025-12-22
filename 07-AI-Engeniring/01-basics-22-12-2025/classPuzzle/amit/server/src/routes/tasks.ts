import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask, } from '../controllers/taskController.js';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Task routes - spotless like a baby's bottom
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
