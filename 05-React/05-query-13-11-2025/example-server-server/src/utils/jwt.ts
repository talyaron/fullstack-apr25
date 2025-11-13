import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { IUser } from '../models/User';

interface TokenPayload {
  userId: string;
  email: string;
}

// Generate JWT token
export const generateToken = (user: IUser): string => {
  const payload: TokenPayload = {
    userId: user._id.toString(),
    email: user.email
  };

  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRE || '7d';

  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.sign(payload, secret, {
    expiresIn
  });
};

// Verify JWT token
export const verifyToken = (token: string): TokenPayload => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.verify(token, secret) as TokenPayload;
};

// Send token as HTTP-only cookie
export const sendTokenCookie = (res: Response, token: string): void => {
  const isProduction = process.env.NODE_ENV === 'production';

  // Calculate cookie expiration (7 days by default)
  const cookieExpireTime = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

  res.cookie('authToken', token, {
    httpOnly: true,
    secure: isProduction, // Use secure cookies in production
    sameSite: 'strict',
    maxAge: cookieExpireTime,
    path: '/'
  });
};

// Clear auth cookie
export const clearAuthCookie = (res: Response): void => {
  res.cookie('authToken', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/'
  });
};