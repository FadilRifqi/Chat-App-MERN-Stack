import express from "express";
import {
  createUsers,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/UserController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", verifyUser, getUserById);
router.post("/users", createUsers);
router.patch("/users/:id", verifyUser, updateUser);
router.delete("/users/:id", verifyUser, deleteUser);

export default router;
