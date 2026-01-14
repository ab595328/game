import User from "../models/User.js";
import WalletTransaction from "../models/WalletTransaction.js";
import WithdrawRequest from "../models/WithdrawRequest.js";

/* ================= GET WALLET ================= */
export const getWallet = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.wallet);
};

/* ================= ADD CASH (CUSTOM AMOUNT) ================= */
export const addCash = async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount < 100) {
    return res
      .status(400)
      .json({ message: "Minimum amount is ₹100" });
  }

  const user = await User.findById(req.user.id);

  user.wallet.main += amount;
  await user.save();

  await WalletTransaction.create({
    userId: req.user.id,
    amount,
    bonus: 0,
    total: amount,
    mode: "ADD_CASH",
    description: `Added ₹${amount}`
  });

  res.json({
    success: true,
    wallet: user.wallet
  });
};

/* ================= ADD MONEY OFFER ================= */
export const addMoneyOffer = async (req, res) => {
  const amount = 10000;
  const bonus = 2000;

  const user = await User.findById(req.user.id);

  user.wallet.main += amount;
  user.wallet.bonus += bonus;
  await user.save();

  await WalletTransaction.create({
    userId: req.user.id,
    amount,
    bonus,
    total: amount + bonus,
    mode: "ADD_MONEY_OFFER",
    description: "Added ₹10,000 + 20% Bonus"
  });

  res.json({
    success: true,
    wallet: user.wallet
  });
};


/* ================= WALLET HISTORY (LAST 5) ================= */
export const walletHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1️⃣ Deposits / wallet transactions
    const walletTx = await WalletTransaction.find({ userId })
      .sort({ createdAt: -1 });

    // 2️⃣ Approved withdrawals only
    const approvedWithdraws = await WithdrawRequest.find({
      userId,
      status: "APPROVED"
    }).sort({ createdAt: -1 });

    // 3️⃣ Convert withdraw to wallet-history format
    const withdrawTx = approvedWithdraws.map((w) => ({
      _id: w._id,
      description: "Withdrawal Approved",
      total: -w.amount, // negative amount
      createdAt: w.createdAt,
      type: "WITHDRAW"
    }));

    // 4️⃣ Merge + sort
    const merged = [...walletTx, ...withdrawTx].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // 5️⃣ Return only last 5
    res.json(merged.slice(0, 5));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


/* ================= WALLET HISTORY (ALL) ================= */


export const walletHistoryAll = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1️⃣ Deposits / wallet transactions
    const walletTx = await WalletTransaction.find({ userId })
      .sort({ createdAt: -1 });

    // 2️⃣ Only APPROVED withdrawals
    const approvedWithdraws = await WithdrawRequest.find({
      userId,
      status: "APPROVED"
    }).sort({ createdAt: -1 });

    // 3️⃣ Withdraw ko wallet-history format me convert karo
    const withdrawTx = approvedWithdraws.map((w) => ({
      _id: w._id,
      description: "Withdrawal Approved",
      total: -w.amount, // 🔴 negative amount
      createdAt: w.createdAt,
      type: "WITHDRAW"
    }));

    // 4️⃣ Merge both
    const merged = [...walletTx, ...withdrawTx].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.json(merged);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
