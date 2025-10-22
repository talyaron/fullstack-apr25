import { Request, Response } from "express";
import * as userService from "../services/user.services";


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