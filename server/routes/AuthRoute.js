import express from "express";
import { logIn, logOut, me } from "../controllers/Auth.js";

const router = express.Router();

router.post("/login", logIn);
router.get("/me", me);
router.delete("/logout", logOut);
export default router;
