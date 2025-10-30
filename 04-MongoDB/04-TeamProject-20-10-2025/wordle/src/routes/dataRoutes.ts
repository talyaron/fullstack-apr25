import express from "express";
import * as dataControllers from '../controllers/dataControllers'
import {anonymousUserMiddleware} from '../middleware/middleware'
const router = express.Router();


router.get("/get-user-data",anonymousUserMiddleware,  dataControllers.getUserData)
      .patch("/update-data", anonymousUserMiddleware, dataControllers.updateUserData)
      .get("/leaderboard", anonymousUserMiddleware, dataControllers.getLeaderBoard);

export default router;
