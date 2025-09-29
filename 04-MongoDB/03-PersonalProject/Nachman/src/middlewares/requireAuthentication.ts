import { Request, Response, NextFunction } from "express";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.cookies?.userId;
  if (!userId) {
    return res.status(401).json({ 
      success: false, 
      message: "Please sign in to continue" 
    });
  }

  // @ts-ignore
  req.userId = userId;
  next();
};