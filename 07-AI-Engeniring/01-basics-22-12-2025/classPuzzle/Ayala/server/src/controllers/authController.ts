import { Request, Response } from 'express';
import { User } from '../models/User';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, fullName, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'משתמש עם אימייל זה כבר קיים' });
      return;
    }

    const user = new User({
      email,
      fullName,
      password,
      role: 'user'
    });

    await user.save();

    res.cookie('userId', user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.status(201).json({
      message: 'ההרשמה בוצעה בהצלחה',
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'שגיאה בהרשמה' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'אימייל או סיסמה שגויים' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: 'אימייל או סיסמה שגויים' });
      return;
    }

    res.cookie('userId', user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      message: 'התחברת בהצלחה',
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'שגיאה בהתחברות' });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie('userId');
    res.json({ message: 'התנתקת בהצלחה' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'שגיאה בהתנתקות' });
  }
};

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.cookies.userId;
    if (!userId) {
      res.status(401).json({ message: 'לא מחובר' });
      return;
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      res.clearCookie('userId');
      res.status(401).json({ message: 'משתמש לא נמצא' });
      return;
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        favorites: user.favorites
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'שגיאה בקבלת פרטי משתמש' });
  }
};
