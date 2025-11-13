import express from "express";
import * as factController from "../controllers/fact.controller";
import { authenticateApiKey } from "../middlewares/authentication";
import { requireAuth } from "../middlewares/requireAuthentication";

const router = express.Router();

router.use(authenticateApiKey);



router.get("/all-facts", factController.getAllFacts);

router.get("/:id", factController.getFactById);

router.post("/add-fact", requireAuth, factController.createFact);

router.patch("/:id", requireAuth, factController.updateFact);

router.delete("/:id", requireAuth, factController.deleteFact);

export default router;