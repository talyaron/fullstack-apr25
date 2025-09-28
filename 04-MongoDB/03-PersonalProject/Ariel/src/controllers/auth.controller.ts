// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../model/user.model';

// סיכרט JWT (בייצור - שים במשתנה סביבה!)
const JWT_SECRET = 'your-super-secret-jwt-key-2024';

// יצירת טוכן JWT
const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

// רישום משתמש חדש
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // בדיקות ולידציה
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

    // בדיקה אם המשתמש כבר קיים
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists' 
      });
    }

    // יצירת משתמש חדש
    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    // יצירת טוכן
  const token = generateToken(String(user._id));

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
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

// התחברות משתמש
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // בדיקות ולידציה
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // חיפוש משתמש
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // בדיקת סיסמה
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // עדכון תאריך התחברות אחרון
    user.lastLogin = new Date();
    await user.save();

    // יצירת טוכן
    const token = generateToken(String(user._id));

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
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

// קבלת פרטי משתמש
export const getMe = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

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