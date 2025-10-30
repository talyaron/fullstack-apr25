import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.utils";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        username: string;
        role: string;
        controlCenter: string;
      };
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "❌ No token provided. Please login.",
      });
    }

    const token = authHeader.substring(7);

    const decoded = verifyAccessToken(token);

    req.user = decoded;

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "⏰ Token expired. Please refresh your token.",
      });
    }

    res.status(401).json({
      success: false,
      message: "❌ Invalid token",
      error: error.message,
    });
  }
};

export const authorize = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "❌ User not authenticated",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `🚫 Access denied. Required roles: ${allowedRoles.join(", ")}`,
        yourRole: req.user.role,
      });
    }

    next();
  };
};

export const checkControlCenter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const targetControlCenter = 
    req.body.controlCenter || 
    req.params.controlCenter || 
    req.query.controlCenter;

  if (
    req.user?.role !== "admin" &&
    targetControlCenter &&
    req.user?.controlCenter !== targetControlCenter
  ) {
    return res.status(403).json({
      success: false,
      message: "🚫 You can only access data from your control center",
    });
  }

  next();
};