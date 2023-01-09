import express from "express";
import {
  acceptFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
} from "../controllers/FriendController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.post("/friend/:id", verifyUser, sendFriendRequest);
router.post("/friend/accept/:id", verifyUser, acceptFriendRequest);
router.post("/friend/reject/:id", verifyUser, rejectFriendRequest);

export default router;
