import express from "express";
import * as userController from "../controllers/user.controller"
import { authenticateApiKey } from "../middlewares/authentication";
import { requireAuth } from "../middlewares/requireAuthentication";

const router = express.Router();


router.post("/register", userController.register);
router.post("/login", userController.login);

router.post("/logout", authenticateApiKey, requireAuth, userController.logout);
router.get("/me", authenticateApiKey, requireAuth, userController.getCurrentUser);

export default router;