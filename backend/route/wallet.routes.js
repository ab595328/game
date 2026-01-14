import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  getWallet,
  addCash,
  addMoneyOffer,
  walletHistory,
  walletHistoryAll
} from "../controllers/wallet.controller.js";

const router = express.Router();

router.get("/", auth, getWallet);
router.post("/add-cash", auth, addCash);
router.post("/add-money-offer", auth, addMoneyOffer);
router.get("/history", auth, walletHistory);
router.get("/history/all", auth, walletHistoryAll);

export default router;
