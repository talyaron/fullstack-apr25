import express from "express";
import * as dataControllers from '../controllers/dataController'

const router = express.Router();


router.get("/get-user-data", dataControllers.getUserData)
      .patch("//update-data", dataControllers.updateUserData);

export default router;
