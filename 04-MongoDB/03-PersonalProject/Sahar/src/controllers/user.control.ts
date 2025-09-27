import User from "../model/user.model";
import Recipe from "../model/recipe.model";
import express, { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password ,role} = req.body;
    const newUser = new User({ username, password ,role});
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error:any) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const getAllUsers = async (req:Request, res:Response)=>{
try {
  const users = await User.find();
  res.status(200).json(users);
  
} catch (error:any) {
  res.status(500).json({ message: "Error creating user", error });

}
}

export const editUser = async (req:Request, res:Response)=>{
  try {
    const {id} = req.params;
    const {username, password, role} = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, {username, password, role}, {new:true});
    if(!updatedUser){
      return res.status(404).json({message: "User not found"});
    }
    res.status(200).json(updatedUser);
    
  } catch (error:any) {
    res.status(500).json({ message: "Error updating user", error });
  
  }
  }

  export const deleteUser = async (req:Request, res:Response)=>{
    try {
      const {id} = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
      if(!deletedUser){
        return res.status(404).json({message: "User not found"});
      }
      res.status(200).json({message: "User deleted successfully"});
      
    } catch (error:any) {
      res.status(500).json({ message: "Error deleting user", error });
    
    }
    }