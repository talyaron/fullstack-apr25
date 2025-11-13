// src/controllers/auth.controller.ts - מעודכן
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../model/user.model';

const JWT_SECRET = 'your-super-secret-jwt-key-2024';

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

// Register
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists' 
      });
    }

    const user = new User({ name, email, password, cart: [] });
    await user.save();
    
    const token = generateToken(String(user._id));

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        cart: user.cart,
        createdAt: user.createdAt
      }
    });
  } catch (error: any) {
    console.error('Register error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration' 
    });
  }
};

// Login - ללא שינוי
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(String(user._id));

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        cart: user.cart,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
};

// ✅ מעודכן - עכשיו משתמש ב-req.userId מה-Middleware
export const getMe = async (req: Request, res: Response) => {
  try {
    // ה-Middleware כבר אימת את ה-token ושמר את userId
    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        cart: user.cart,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
  } catch (error: any) {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
};

// ✅ מעודכן - משתמש ב-req.userId
export const addToCart = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const { productId, name, price, quantity = 1, image } = req.body;

    const existingItemIndex = user.cart.findIndex(item => item.productId === productId);

    if (existingItemIndex > -1) {
      user.cart[existingItemIndex].quantity += quantity;
    } else {
      user.cart.push({
        productId,
        name,
        price,
        quantity,
        image,
        addedAt: new Date()
      });
    }

    await user.save();

    res.json({
      success: true,
      message: 'Item added to cart',
      cart: user.cart
    });
  } catch (error: any) {
    console.error('Add to cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error adding item to cart' 
    });
  }
};

// ✅ מעודכן - משתמש ב-req.userId
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const { productId, quantity } = req.body;

    if (!productId || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID or quantity'
      });
    }

    const itemIndex = user.cart.findIndex(item => item.productId === productId);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    if (quantity === 0) {
      user.cart.splice(itemIndex, 1);
    } else {
      user.cart[itemIndex].quantity = quantity;
    }

    await user.save();

    res.json({
      success: true,
      message: 'Cart updated',
      cart: user.cart
    });
  } catch (error: any) {
    console.error('Update cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error updating cart' 
    });
  }
};

// ✅ מעודכן - משתמש ב-req.userId
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const { productId } = req.params;

    user.cart = user.cart.filter(item => item.productId !== productId);
    await user.save();

    res.json({
      success: true,
      message: 'Item removed from cart',
      cart: user.cart
    });
  } catch (error: any) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error removing item from cart' 
    });
  }
};

// ✅ מעודכן - משתמש ב-req.userId
export const clearCart = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    user.cart = [];
    await user.save();

    res.json({
      success: true,
      message: 'Cart cleared',
      cart: user.cart
    });
  } catch (error: any) {
    console.error('Clear cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error clearing cart' 
    });
  }
};