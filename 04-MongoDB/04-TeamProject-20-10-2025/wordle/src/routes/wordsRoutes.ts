import express from "express";
import * as userControllers from '../controllers/user.controller'
const router = express.Router();


router.get("/get-all-users", userControllers.getAllUsers)
      .get("/get-leaders", userControllers.getLeaders)
export default router;

