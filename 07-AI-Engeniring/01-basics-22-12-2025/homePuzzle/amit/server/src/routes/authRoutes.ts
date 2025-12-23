import { Router } from 'express';
import { checkUser, getCurrentUser } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/check-user', checkUser);

router.get('/me', authenticate, getCurrentUser);

export default router;
