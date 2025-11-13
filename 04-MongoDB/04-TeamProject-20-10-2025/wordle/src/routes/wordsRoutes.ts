import express from "express";
import * as wordsControlles from "../controllers/wordsControllers";

const router = express.Router();

router.get("/get-random-word", wordsControlles.getRandomWord);
router.post("/check-if-exist", wordsControlles.checkIfExist);

export default router;
