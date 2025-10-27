import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel , User} from "../model/userModel";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existing = await userModel.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password: hashed });

    res.status(201).json({ message: "User registered successfully", user });
  } catch {
    res.status(500).json({ message: "Server error in register" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true, secure: false });
    res.json({ message: "Logged in successfully", user });
  } catch {
    res.status(500).json({ message: "Server error inlogin" });
  }
};

export const logout = async (_req: Request, res: Response) => {
    try{
         res.clearCookie('userId');
  res.json({ message: 'Logout successful' });}
catch{    res.status(500).json({ message: "Server error in logout" });
}
};
export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};


export const getLeaders = async (_req: Request, res: Response) => {
  try {
    const users = await userModel.find().lean() as Array<User & { gamesPlayed?: number; gamesWon?: number }>;

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Calculate success rate for each user
    const usersWithSuccess = users.map(user => {
      const gamesPlayed = user.gamesPlayed || 0;
      const gamesWon = user.gamesWon || 0;
      const successRate = gamesPlayed > 0 ? (gamesWon / gamesPlayed) * 100 : 0;

      return {
        ...user,
        successRate,
      };
    });

    // Sort by success rate (descending) and take top 10
    const topTen = usersWithSuccess
      .sort((a, b) => b.successRate - a.successRate)
      .slice(0, 10);

    return res.status(200).json(topTen);

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Error getting top users" });
  }
};


