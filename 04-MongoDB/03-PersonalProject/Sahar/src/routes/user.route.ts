import express  from 'express'
import User from "../model/user.model";
import { createUser, deleteUser, editUser, getAllUsers } from '../controllers/user.control';
const router = express.Router();
router.post("/post/create-user", createUser);
router.get("/get/all-users",getAllUsers);
router.put("/put/edit-user/:id",editUser);
router.delete("/delete/delete-user/:id",deleteUser);
export default router;  