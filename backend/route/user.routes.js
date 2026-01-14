import express from "express";
import auth from "../middleware/auth.middleware.js";
import { getMe, updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

// Logged-in user info
router.get("/me", auth, getMe);
router.put("/update", auth, updateProfile);

export default router;
