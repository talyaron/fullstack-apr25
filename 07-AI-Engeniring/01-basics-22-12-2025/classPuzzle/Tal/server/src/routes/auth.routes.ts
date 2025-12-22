import { Router } from 'express';
import { register, login, logout, getMe } from '../controllers/auth.controller';
import { validateBody } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { UserRegisterSchema, UserLoginSchema } from '@space-task/shared';

const router = Router();

router.post('/register', validateBody(UserRegisterSchema), register);
router.post('/login', validateBody(UserLoginSchema), login);
router.post('/logout', logout);
router.get('/me', authMiddleware, getMe);

export default router;
