import { Request, Response, NextFunction } from "express";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.cookies?.userId;
  if (!userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  // @ts-ignore
  req.userId = userId;
  next();
};
