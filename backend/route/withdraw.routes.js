import express from "express";
import auth from "../middleware/auth.middleware.js";
import { withdrawMoney } from "../controllers/withdraw.controller.js";
import { withdrawHistory } from "../controllers/withdraw.controller.js";

const router = express.Router();

router.post("/", auth, withdrawMoney);
router.get("/history", auth, withdrawHistory);

export default router;