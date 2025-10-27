import express from "express";
import * as userControllers from '../controllers/userControllers'

const router = express.Router();


router.get("/get-all-users", userControllers.getAllUsers)
      .get("/get-leaders", userControllers.getLeaders)
      .post("/register", userControllers.register)
      .post("/login", userControllers.login)
      .post("/logout", userControllers.logout)

export default router;
