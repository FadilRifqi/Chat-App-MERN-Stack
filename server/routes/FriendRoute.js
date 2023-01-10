import express from "express";
import {
  acceptFriendRequest,
  deleteFriendReq,
  getFriendRequest,
  getFriends,
  rejectFriendRequest,
  sendFriendRequest,
} from "../controllers/FriendController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.post("/friend/:id", verifyUser, sendFriendRequest);
router.delete("/friend/:id", verifyUser, deleteFriendReq);
router.post("/friend/accept/:id", verifyUser, acceptFriendRequest);
router.post("/friend/reject/:id", verifyUser, rejectFriendRequest);
router.get("/friend", verifyUser, getFriends);
router.get("/friend/:id", verifyUser, getFriendRequest);

export default router;
