import { Request, Response, NextFunction } from 'express';

export const validateRegistration = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    res.status(400).json({ success: false, message: 'All fields required' });
    return;
  }
  if (password !== confirmPassword) {
    res.status(400).json({ success: false, message: 'Passwords do not match' });
    return;
  }
  next();
};

export const validateCartItem = (req: Request, res: Response, next: NextFunction): void => {
  const { productId, name, price } = req.body;
  if (!productId || !name || !price) {
    res.status(400).json({ success: false, message: 'Invalid item' });
    return;
  }
  next();
}; 