import express from "express";
import * as dataControllers from '../controllers/dataControllers'

const router = express.Router();


router.get("/get-user-data", dataControllers.getUserData)
      .patch("/update-data", dataControllers.updateUserData)
      .get("/leaderboard", dataControllers.getLeaderBoard);

export default router;
