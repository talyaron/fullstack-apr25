import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { register, login, logout, getCurrentUser } from '../controllers/authController.js';

const router = Router();

// Auth routes - clean as a baby's bottom
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticateToken, getCurrentUser);

export default router;
