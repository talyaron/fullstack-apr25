import { Router } from 'express';
import { register, login, logout, getMe, refreshToken } from '../controllers/authController';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// ===============================================
// PUBLIC ROUTES
// ===============================================
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);

// ===============================================
// PROTECTED ROUTES
// ===============================================
router.get('/me', authenticate, getMe);
router.post('/logout', authenticate, logout);

export default router;