import express from "express";
import * as userController from '../controllers/usersControllers'

const router = express.Router();

router.get("/get-user", userController.aa);
router.post("/add-user", userController.aa);
router.patch("/update-user", userController.aa);
router.delete("/delete-user", userController.aa);
