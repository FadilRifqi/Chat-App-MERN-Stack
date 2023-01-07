import express from "express";
import { getRoom } from "../controllers/RoomController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/room", getRoom);

export default router;
