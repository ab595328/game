import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {
  getWalletApi,
  walletHistoryApi
} from "../api/wallet";

const Wallet = () => {
  const navigate = useNavigate();

  const [wallet, setWallet] = useState({
    main: 0,
    bonus: 0
  });

  const [transactions, setTransactions] = useState([]);
  const location = useLocation();
  const [showCongrats, setShowCongrats] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    loadWallet();
    if (location.state?.success) {
      setShowCongrats(true);
      setSuccessMessage(location.state.message);

      // 4 sec baad auto hide
      setTimeout(() => {
        setShowCongrats(false);
        // state clear so refresh pe dobara na aaye
        window.history.replaceState({}, document.title);
      }, 2000);
    }
  }, []);

  const loadWallet = async () => {
    try {
      const walletRes = await getWalletApi();
      const historyRes = await walletHistoryApi();

      setWallet(walletRes.data);
      setTransactions(historyRes.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load wallet");
    }
  };


  const totalBalance = wallet.main + wallet.bonus;

  return (
    <div className="max-w-md md:max-w-3xl lg:max-w-6xl mx-auto px-4">
      {showCongrats && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 text-white px-5 py-4 rounded-2xl shadow-2xl animate-slideDown">

            {/* ICON */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xl">
                🎉
              </div>

              <div className="flex-1">
                <p className="font-semibold text-sm">
                  Congratulations!
                </p>
                <p className="text-xs text-gray-300 mt-1">
                  {successMessage}
                </p>
              </div>

              {/* CLOSE */}
              <button
                onClick={() => setShowCongrats(false)}
                className="text-gray-300 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* GLOW BAR */}
            <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 rounded-b-2xl"></div>
          </div>
        </div>
      )}

      {/* ================= WALLET HEADER CARD ================= */}
      <div className="mt-4 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 shadow-2xl">
        <h2 className="text-lg font-semibold mb-3">My Wallet</h2>

        <p className="text-sm opacity-80">Total Balance</p>
        <h1 className="text-3xl font-bold">₹{totalBalance}</h1>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs opacity-80">Main Wallet</p>
            <p className="font-bold">₹{wallet.main}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs opacity-80">Bonus</p>
            <p className="font-bold text-yellow-300">
              ₹{wallet.bonus}
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={() => navigate("/wallet/add-cash")}
            className="flex-1 bg-white text-purple-700 py-2 rounded-xl font-semibold"
          >
            + Add Cash
          </button>

          <button
            onClick={() => navigate("/wallet/withdraw")}
            className="flex-1 border border-white py-2 rounded-xl"
          >
            Withdraw
          </button>

        </div>
      </div>

      {/* ================= SPECIAL OFFER ================= */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 mt-6">
        <h3 className="font-semibold flex items-center gap-2">
          🎁 Special Offer
        </h3>
        <p className="text-sm mt-1">
          Add ₹10,000 and get <b>20% bonus cash!</b>
        </p>

        <button
          onClick={() => navigate("/wallet/add-money")}
          className="mt-4 w-full bg-white text-orange-600 py-2 rounded-xl font-semibold"
        >
          Add Money Now
        </button>
      </div>

      {/* ================= TRANSACTIONS ================= */}
      <section className="mt-8 mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Transactions
          </h3>
          <span
            onClick={() => navigate("/wallet/history")}
            className="text-sm text-yellow-400 cursor-pointer"
          >
            View All →
          </span>
        </div>

        {transactions.length === 0 && (
          <p className="text-sm text-gray-400">
            No transactions yet
          </p>
        )}

        {transactions.map((tx) => {
  const isCredit = tx.total > 0;

  return (
    <TransactionItem
      key={tx._id}
      title={tx.description}
      time={new Date(tx.createdAt).toLocaleString()}
      amount={`${isCredit ? "+" : "-"}₹${Math.abs(tx.total)}`}
      type={isCredit ? "credit" : "debit"}
    />
  );
})}

      </section>
    </div>
  );
};

/* ================= TRANSACTION ITEM ================= */

const TransactionItem = ({ title, time, amount, type }) => {
  const isDebit = type === "debit";

  return (
    <div className="bg-white/5 rounded-xl p-4 mb-3 flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isDebit
              ? "bg-red-500/20 text-red-400"
              : "bg-green-500/20 text-green-400"
          }`}
        >
          {isDebit ? "⬇️" : "⬆️"}
        </div>

        <div>
          <p className="font-semibold text-sm">
            {title}
          </p>
          <p className="text-xs text-gray-400">
            {time}
          </p>
        </div>
      </div>

      <p
        className={`font-bold ${
          isDebit ? "text-red-400" : "text-green-400"
        }`}
      >
        {amount}
      </p>
    </div>
  );
};


export default Wallet;
