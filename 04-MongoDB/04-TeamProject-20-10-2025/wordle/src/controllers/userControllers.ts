import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel, User } from "../model/userModel";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    console.log({ name, email, password })
    const existing = await userModel.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password: hashed });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ message: `Server error in register: ${error.message}` });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    console.log(user)

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "30m" });
    res.cookie("token", token, { httpOnly: true, sameSite: "lax", secure: false });
    res.status(200).json({ message: "Logged in successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error in login" });
  }
};

export const logout = async (_req: Request, res: Response) => {
  try {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
  }
  catch {
    res.status(500).json({ message: "Server error in logout" });
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
