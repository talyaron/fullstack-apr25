import { Router } from 'express';
import { createTask, getTasks, getTask, updateTask, deleteTask } from '../controllers/task.controller';
import { validateBody, validateParams } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { TaskCreateSchema, TaskUpdateSchema, TaskIdParamSchema } from '@space-task/shared';

const router = Router();

router.use(authMiddleware);

router.post('/', validateBody(TaskCreateSchema), createTask);
router.get('/', getTasks);
router.get('/:id', validateParams(TaskIdParamSchema), getTask);
router.put('/:id', validateParams(TaskIdParamSchema), validateBody(TaskUpdateSchema), updateTask);
router.delete('/:id', validateParams(TaskIdParamSchema), deleteTask);

export default router;
