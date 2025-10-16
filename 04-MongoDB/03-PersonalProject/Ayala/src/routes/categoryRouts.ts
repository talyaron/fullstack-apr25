import  express from "express";
import * as categoryController from '../controllers/categoryControllers'
const router = express.Router();

router
    .get("/get-all-categories", categoryController.getAllCategories)
    .post("/add-category", categoryController.addCategory)
