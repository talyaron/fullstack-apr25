// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../model/user.model';

const JWT_SECRET = 'your-super-secret-jwt-key-2024';

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

const setTokenCookie = (res: Response, token: string) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};

// ✅ Register user
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Passwords do not match' 
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists' 
      });
    }

    const user = new User({
      name,
      email,
      password,
      cart: []
    });

    await user.save();
    const token = generateToken(String(user._id));

    setTokenCookie(res, token);

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

// ✅ Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

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
    setTokenCookie(res, token);

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

// ✅ Logout
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token');
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error during logout' 
    });
  }
};

// ✅ Get user profile
export const getMe = async (req: Request, res: Response) => {
  try {
    // 🔍 Debug
    console.log('━━━━━━━━━━━━━━━━━━━━');
    console.log('🍪 Cookies:', req.cookies);
    console.log('📋 Headers:', req.headers.authorization);
    console.log('━━━━━━━━━━━━━━━━━━━━');
    
    let token = req.cookies.token;
    
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        token = authHeader.replace('Bearer ', '');
      }
    }
    
    if (!token) {
      console.log('❌ No token found');
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    console.log('🎫 Token:', token.substring(0, 20) + '...');

    const decoded: any = jwt.verify(token, JWT_SECRET);
    console.log('✅ Token decoded:', decoded.userId);
    
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    console.log('✅ User found:', user.email);

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
    console.error('❌ GetMe error:', error.message);
    res.status(401).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
};

// ✅ Add to cart
export const addToCart = async (req: Request, res: Response) => {
  try {
    let token = req.cookies.token;
    
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        token = authHeader.replace('Bearer ', '');
      }
    }
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const { productId, name, price, quantity = 1, image } = req.body;

    if (!productId || !name || !price) {
      return res.status(400).json({
        success: false,
        message: 'Product ID, name, and price are required'
      });
    }

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

// ✅ Update cart item
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    let token = req.cookies.token;
    
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        token = authHeader.replace('Bearer ', '');
      }
    }
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

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

// ✅ Remove from cart
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    let token = req.cookies.token;
    
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        token = authHeader.replace('Bearer ', '');
      }
    }
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

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

// ✅ Clear cart
export const clearCart = async (req: Request, res: Response) => {
  try {
    let token = req.cookies.token;
    
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        token = authHeader.replace('Bearer ', '');
      }
    }
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

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