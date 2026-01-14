import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMoneyOfferApi } from "../api/wallet";

const AddMoneyOffer = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAddMoney = async () => {
    try {
      setLoading(true);
      await addMoneyOfferApi();
      navigate("/wallet", {
      state: {
        success: true,
        message: "🎉 Congratulations! ₹10,000 added + ₹2,000 bonus credited to your wallet."
      }
    });
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.message ||
          "Failed to add money"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white px-4 py-6">

      {/* HEADER */}
      <div className="max-w-md mx-auto mb-6">
        <h2 className="text-xl font-bold">
          Add Money
        </h2>
        <p className="text-sm text-gray-400">
          Special bonus offer
        </p>
      </div>

      {/* OFFER CARD */}
      <div className="max-w-md mx-auto bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 shadow-xl">

        <h3 className="text-lg font-semibold mb-2">
          🎁 Limited Time Offer
        </h3>

        <p className="text-sm opacity-90">
          Add <b>₹10,000</b> and get
        </p>

        <p className="text-3xl font-bold mt-2">
          ₹2,000 Bonus
        </p>

        <p className="text-sm opacity-90 mt-1">
          Total Wallet Credit: <b>₹12,000</b>
        </p>

        <ul className="text-xs opacity-90 mt-4 space-y-1">
          <li>• Bonus usable in games</li>
          <li>• Instant wallet credit</li>
          <li>• No withdrawal on bonus</li>
        </ul>

        <button
          onClick={handleAddMoney}
          disabled={loading}
          className="w-full mt-6 bg-white text-orange-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition disabled:opacity-70"
        >
          {loading
            ? "Processing..."
            : "Add ₹10,000 Now"}
        </button>
      </div>
    </div>
  );
};

export default AddMoneyOffer;
