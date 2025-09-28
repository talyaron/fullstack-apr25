// src/routes/user.routes.ts
import express from "express";
import * as userController from "../controllers/user.controller"
import { authenticateApiKey } from "../middlewares/authentication";
import { requireAuth } from "../middlewares/requireAuthentication";

const router = express.Router();

// Public auth routes (no API key needed for login/register)
router.post("/register", userController.register);
router.post("/login", userController.login);

// Protected routes
router.post("/logout", authenticateApiKey, requireAuth, userController.logout);
router.get("/me", authenticateApiKey, requireAuth, userController.getCurrentUser);

// Add basic GET route for testing
router.get("/", (req, res) => {
  res.json({ 
    message: "User API is working", 
    endpoints: ["/register", "/login", "/logout", "/me"] 
  });
});

export default router;