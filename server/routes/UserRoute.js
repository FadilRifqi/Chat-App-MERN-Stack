import express from "express";
import {
  createUsers,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/UserController.js";
import User from "../models/UserModel.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUsers);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
