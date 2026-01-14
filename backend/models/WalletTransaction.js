import mongoose from "mongoose";

const walletTransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  amount: { type: Number, required: true },   // main amount
  bonus: { type: Number, default: 0 },
  total: { type: Number, required: true },

  mode: {
    type: String,
    enum: ["ADD_CASH", "ADD_MONEY_OFFER"],
    required: true
  },

  description: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model(
  "WalletTransaction",
  walletTransactionSchema
);
