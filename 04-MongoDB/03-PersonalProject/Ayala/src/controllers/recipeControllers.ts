import { IFavorite } from "../model/favoriteModel";
import { IRecipe, Recipe } from "../model/recipeModel"
const userId = "6546"
import { Request, Response } from "express";

export async function getRecipesByCategory(req: Request, res: Response) {
   try {
      const { category } = req.body;
      const recipes = await IRecipe
         .find({ category: category }).populate("creatorId", "name");
      if (!recipes) {
         return res.status(404).json({ message: "No recipes found for this category" });
      }
      res.status(200).json(recipes);
   } catch (error) {
      res.status(500).json({ message: "Server error, in getRecipesByCategory controller function" })
   }
}

export async function getRecipe(req: Request, res: Response) {
   try {
      const recipeId = req.params.id;
      const recipe = await IRecipe
         .find({ _id: recipeId }).populate("creatorId", "name");
      if (!recipe) {
         return res.status(404).json({ message: "No recipes found for this category" });
      }
      res.status(200).json(recipe);
   } catch (error) {
      res.status(500).json({ message: "Server error, in getRecipesByCategory controller function" })
   }
}



export async function getFavoriteRecipes(req: Request, res: Response) {
   try {
      // const userId = req.userId;

      const favorites = await IFavorite.find({ userId }).populate("recipeId");
      const favoriteRecipes = favorites.map(fav => fav.recipeId);
      res.status(200).json(favoriteRecipes);
   } catch (error) {
      console.error("Error getting favorite recipes:", error);
      res.status(500).json({
         message: "Server error in getFavoriteRecipes controller",
      });
   }
}

export async function addRecipe(req: Request, res: Response) {
   try {
      // const userId = req.userId;

      const { name, ingredients, instructions, categoryId } = req.body;
      if (!name || !ingredients || !instructions || !categoryId) {
         return res.status(400).json({ message: "Missing required fields" });
      }
      const newRecipe = new IRecipe({ name, ingredients, instructions, categoryId, creatorId: userId });
      await newRecipe.save();
      res.status(201).json(newRecipe);
   } catch (error) {
      res.status(500).json({ message: "Server error, in getRecipesByCategory controller function" })
   }
}
export async function editRecipe(){
   try{

   }
   catch{
      
   }
}
