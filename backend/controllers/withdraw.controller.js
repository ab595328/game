import User from "../models/User.js";
import WithdrawRequest from "../models/WithdrawRequest.js";

/* ================= CREATE WITHDRAW REQUEST ================= */
export const withdrawMoney = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, upiId } = req.body;

    // rules
    if (!amount || amount < 200) {
      return res
        .status(400)
        .json({ message: "Minimum withdraw amount is ₹200" });
    }

    if (!upiId) {
      return res
        .status(400)
        .json({ message: "UPI ID is required" });
    }

    const user = await User.findById(userId);

    if (user.wallet.main < amount) {
      return res
        .status(400)
        .json({ message: "Insufficient wallet balance" });
    }

    // deduct balance immediately (safe practice)
    user.wallet.main -= amount;
    await user.save();

    // create withdraw request
    await WithdrawRequest.create({
      userId,
      amount,
      upiId,
      method: "UPI",
      status: "PENDING"
    });

    res.json({
      success: true,
      message:
        "Withdrawal request submitted. It will be processed soon.",
      wallet: user.wallet
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const withdrawHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const history = await WithdrawRequest.find({ userId })
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};