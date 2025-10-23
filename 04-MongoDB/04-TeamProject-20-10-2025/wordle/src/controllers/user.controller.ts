import { Request, Response } from "express";
import * as userService from "../services/user.services";
import { userModel, User } from "../model/user.model";


export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const user = await userService.register(name, email, password);
    if (!user) throw new Error("Something went wrong, user not created");

    res.cookie("userId", user._id.toString(), {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(201).json({ message: "User registered successfully", name: user.name });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "User registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await userService.login(email, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.cookie("userId", user._id.toString(), {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(200).json({ message: "Login successful", name: user.name });
  } catch (error: any) {
    res.status(500).json({ message: "Error logging in" });
  }
};



export const getAllUsers = async (_req: Request, res: Response) => {

  try {
    const users = await userModel.find();
          if (!users) {
              return res.status(404).json({ message: "No users found" });
          }
          res.status(200).json(users);

  } catch (error: any) {
    res.status(500).json({ message: "getting all users" });
  }
};

export const getLeaders = async (_req: Request, res: Response) => {
  try {
    const users = await userModel.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Calculate success rate for each user
    const usersWithSuccess = users.map(user => {
      const gamesPlayed = (user as any).gamesPlayed || 0;
      const gamesWon = (user as any).gamesWon || 0;
      const successRate = gamesPlayed > 0 ? (gamesWon / gamesPlayed) * 100 : 0;

      return {
        ...user.toObject(),
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


