import { Request, Response, NextFunction } from "express";

const API_KEY = "your-secret-key-123";

export function authenticateApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers["x-api-key"];

    if (apiKey !== API_KEY) {

        return res.status(401).json({
            error: "Unauthorized",
            message: "Invalid or missing API Key"
        });
    }
    return next();
}