import jwt from "jsonwebtoken";

export interface TokenPayload {
  userId: string;
  username: string;
  role: string;
  controlCenter: string;
}

// create Access Token (15m)
export const generateAccessToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("❌ JWT_SECRET is not defined in .env file");
  }

  return jwt.sign(payload, secret, { expiresIn: "15m" });
};

// create Refresh Token (7d)
export const generateRefreshToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_REFRESH_SECRET;

  if (!secret) {
    throw new Error("❌ JWT_REFRESH_SECRET is not defined in .env file");
  }

  return jwt.sign(payload, secret, { expiresIn: "7d" });
};

// verify -  Access Token
export const verifyAccessToken = (token: string): TokenPayload => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("❌ JWT_SECRET is not defined");
  }

  return jwt.verify(token, secret) as TokenPayload;
};

// verify - Refresh Token
export const verifyRefreshToken = (token: string): TokenPayload => {
  const secret = process.env.JWT_REFRESH_SECRET;

  if (!secret) {
    throw new Error("❌ JWT_REFRESH_SECRET is not defined");
  }

  return jwt.verify(token, secret) as TokenPayload;
};
