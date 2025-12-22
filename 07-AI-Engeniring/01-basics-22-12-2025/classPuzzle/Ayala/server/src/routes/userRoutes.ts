import { Router } from 'express';
import { getAllUsers, getUserFavorites } from '../controllers/userController';
import { isAdmin, isAuthenticated } from '../middleware/auth';

const router = Router();

// Admin only - get all users
router.get('/', isAdmin, getAllUsers);

// Authenticated user - get favorites
router.get('/favorites', isAuthenticated, getUserFavorites);

export default router;
