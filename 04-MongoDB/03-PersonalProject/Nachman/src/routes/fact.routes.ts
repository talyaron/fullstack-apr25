// src/routes/fact.routes.ts
import express from "express";
import * as factController from "../controllers/fact.controller";
import { authenticateApiKey } from "../middlewares/authentication";
import { requireAuth } from "../middlewares/requireAuthentication";

const router = express.Router();

// Public routes (no API key needed for basic viewing)
router.get("/all-facts", factController.getAllFacts);
router.get("/:id", factController.getFactById);

// Protected routes (need API key + auth)
router.post("/add-fact", authenticateApiKey, requireAuth, factController.createFact);
router.patch("/:id", authenticateApiKey, requireAuth, factController.updateFact);
router.delete("/:id", authenticateApiKey, requireAuth, factController.deleteFact);

export default router;