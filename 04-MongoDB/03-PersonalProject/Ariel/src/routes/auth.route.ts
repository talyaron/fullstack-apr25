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

// Middleware - Authentication and Validation
import { authenticateToken } from '../middleware/auth.middleware';
import { 
  validateRegistration, 
  validateCartItem 
} from '../middleware/validation.middleware';

const router = express.Router();

// ==========================================
// Public Routes - No authentication required
// ==========================================

/**
 * POST /api/auth/register
 * Register new user
 * Body: { name, email, password, confirmPassword }
 */
router.post('/register', 
  validateRegistration,  // Validate input data
  register               // Create new user
);

/**
 * POST /api/auth/login
 * User login
 * Body: { email, password }
 */
router.post('/login', 
  login
);

// ==========================================
// Protected Routes - Requires authentication token
// ==========================================

/**
 * GET /api/auth/me
 * Get current user details
 * Headers: { Authorization: "Bearer TOKEN" }
 */
router.get('/me', 
  authenticateToken,  // Verify JWT token
  getMe               // Return user data
);

// ==========================================
// Cart Routes - Requires authentication
// ==========================================

/**
 * POST /api/auth/cart/add
 * Add item to cart
 * Headers: { Authorization: "Bearer TOKEN" }
 * Body: { productId, name, price, quantity?, image? }
 */
router.post('/cart/add',
  authenticateToken,  // Verify token
  validateCartItem,   // Validate product data
  addToCart           // Add to cart
);

/**
 * PUT /api/auth/cart/update
 * Update cart item quantity
 * Headers: { Authorization: "Bearer TOKEN" }
 * Body: { productId, quantity }
 */
router.put('/cart/update',
  authenticateToken,  // Verify token
  updateCartItem      // Update quantity
);

/**
 * DELETE /api/auth/cart/remove/:productId
 * Remove item from cart
 * Headers: { Authorization: "Bearer TOKEN" }
 * Params: productId
 */
router.delete('/cart/remove/:productId',
  authenticateToken,  // Verify token
  removeFromCart      // Remove item
);

/**
 * DELETE /api/auth/cart/clear
 * Clear entire cart
 * Headers: { Authorization: "Bearer TOKEN" }
 */
router.delete('/cart/clear',
  authenticateToken,  // Verify token
  clearCart           // Clear cart
);

export default router;