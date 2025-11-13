import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

// יצירת טוקן JWT
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'default-secret', {
    expiresIn: '30d'
  });
};

// הרשמה
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // בדיקה אם המשתמש קיים
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'משתמש עם אימייל או שם משתמש זה כבר קיים'
      });
    }

    // יצירת משתמש חדש
    const user = await User.create({
      username,
      email,
      password
    }) as typeof User.prototype;

    // החזרת תגובה עם טוקן
    res.status(201).json({
      success: true,
      message: 'המשתמש נוצר בהצלחה',
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id.toString())
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'שגיאה ביצירת משתמש',
      error: error.message
    });
  }
};

// התחברות
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // בדיקה אם המשתמש קיים
    const user = await User.findOne({ email }) as typeof User.prototype | null;
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'אימייל או סיסמה שגויים'
      });
    }

    // בדיקת סיסמה
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'אימייל או סיסמה שגויים'
      });
    }

    // החזרת תגובה עם טוקן
    res.status(200).json({
      success: true,
      message: 'התחברות בוצעה בהצלחה',
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id.toString())
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'שגיאה בהתחברות',
      error: error.message
    });
  }
};

// קבלת פרטי משתמש מחובר
export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user.id).select('-password');
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'שגיאה בקבלת פרטי משתמש',
      error: error.message
    });
  }
};