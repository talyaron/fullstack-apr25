import express from "express";
import * as factController from "../controllers/fact.controller";

const router = express.Router();

router.get("/all-facts", factController.getAllFacts);
router.get("/facts/:id", factController.getFactById);
router.post("/create-fact", factController.createFact);
router.patch("/update-fact", factController.updateFact);
router.delete("/delete-fact", factController.deleteFact);

export default router;