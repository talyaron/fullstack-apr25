import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'אין הרשאה, נדרשת התחברות'
      });
    }

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'default-secret');
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'משתמש לא נמצא'
        });
      }
      
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'טוקן לא תקין'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'שגיאת שרת'
    });
  }
};