import express from "express";
import * as recipeController from '../controllers/recipeControllers'
const router = express.Router();

router.get("/get-recipes-by-category", recipeController.getRecipesByCategory)
    .get("/get-recipe/:id", recipeController.getRecipe)
    .get("/get-favorite-recipes", recipeController.getFavoriteRecipes)
    .post("/add-recipe/", recipeController.addRecipe)
    // .patch("/edit-recipe", recipeController.editRecipe)
    // .patch("/mark-as-favorite", recipeController.markAsFavorite)
    // .delete("/delete-recipe", recipeController.deleteRecipe)

