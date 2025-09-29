import express from "express";
import * as recipeController from '../controllers/recipeControllers'
import * as userController from '../controllers/usersControllers'

const router = express.Router();

router.get("/get-recipes", recipeController.aa);
router.get("/get-favorite-recipes", recipeController.aa);
router.post("/add-recipe", recipeController.aa);
router.patch("/update-recipe", recipeController.aa);
router.delete("/delete-recipe", recipeController.aa);
