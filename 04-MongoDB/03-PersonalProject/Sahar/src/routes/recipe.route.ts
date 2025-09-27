import express  from 'express'
import Recipe from "../model/recipe.model";
import { createRecipe, deleteRecipe, editRecipe, getAllRecips } from '../controllers/recipe.control';
const router = express.Router();
router.post("/post/create-recipe", createRecipe);
router.delete("/delete/delete-recipe", deleteRecipe);
router.get("/get/all-recipes", getAllRecips);
router.put("/put/edit-recipe/:id", editRecipe);
export default router;  
