import Recipe from "../model/recipe.model";
import express, { Request, Response } from "express";
import mongoose from "mongoose";

export const createRecipe = async (req: Request, res: Response) => {

try {

    const {title,description,instructions,ingredients,imageUrl} = req.body;
    const newRecipe = new Recipe ({title,description,instructions,ingredients,imageUrl});
    await newRecipe.save();
    res.status(201).json(newRecipe);

} catch (error:any) {
    res.status(500).json({ message: "Error creating user", error });
  }
}

export const deleteRecipe = async (req:Request,res:Response)=>{
    try {
        const { id } = req.params;
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        if(!deletedRecipe){
            return res.status(404).json({message: "Recipe not found"});
        }
        res.status(200).json({message: "Recipe deleted successfully"});
    } catch (error:any) {
    res.status(500).json({ message: "Error deleting recipe", error });
  }
}


export const getAllRecips = async (req : Request , res:Response)=>{
try {
    const recipe = await Recipe.find();
  res.status(200).json(recipe);
} catch (error:any) {
    res.status(500).json({ message: "Error creating user", error });
  }

}

export const editRecipe = async (req:Request, res:Response)=>{
    try {
        const {id} = req.params;
        const {title,description,instructions,ingredients,imageUrl} = req.body;
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, {title,description,instructions,ingredients,imageUrl}, {new:true});
        if(!updatedRecipe){
            return res.status(404).json({message: "Recipe not found"});
        }
        res.status(200).json(updatedRecipe);
    } catch (error:any) {
    res.status(500).json({ message: "Error creating user", error });
  }
}