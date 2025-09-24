import { Request, Response } from "express";
import * as userService from "../services/user.services"

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await userService.register(name, email, password);
        if (!newUser) throw new Error("Something went wrong can't find your user")
        res.status(201).json({ message: "User registered successfully", user: newUser })
    } catch (error: any) {
        res.status(400).json({ message: error.message})
    }  
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userService.login(email, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful", userId: user._id, name: user.name });
  } catch (error: any) {
    res.status(500).json({ message: "Error logging in" });
  }
};