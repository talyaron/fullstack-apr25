// src/routes/auth.route.ts
import express from 'express';

// Controllers
import { 
  register, 
  login, 
  getMe, 
  addToCart, 
  updateCartItem, 
  removeFromCart, 
  clearCart 
} from '../controllers/auth.controller';

// Middleware
import { authenticateToken } from '../middleware/auth.middleware';
import { 
  validateRegistration, 
  validateCartItem 
} from '../middleware/validation.middleware';

const router = express.Router();

// Public Routes - No authentication required
router.post('/register', validateRegistration, register);
router.post('/login', login);

// Protected Routes - Requires authentication token
router.get('/me', authenticateToken, getMe);

// Cart Routes - Requires authentication
router.post('/cart/add', authenticateToken, validateCartItem, addToCart);
router.put('/cart/update', authenticateToken, updateCartItem);
router.delete('/cart/remove/:productId', authenticateToken, removeFromCart);
router.delete('/cart/clear', authenticateToken, clearCart);

export default router;