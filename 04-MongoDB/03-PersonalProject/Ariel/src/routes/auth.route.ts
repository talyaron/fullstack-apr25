// src/routes/auth.route.ts
import express from 'express';
import { 
  register, 
  login, 
  getMe, 
  addToCart, 
  updateCartItem, 
  removeFromCart, 
  clearCart 
} from '../controllers/auth.controller';

const router = express.Router();

// Authentication routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', getMe);

// Cart management routes
router.post('/cart/add', addToCart);
router.put('/cart/update', updateCartItem);
router.delete('/cart/remove/:productId', removeFromCart);
router.delete('/cart/clear', clearCart);

export default router;