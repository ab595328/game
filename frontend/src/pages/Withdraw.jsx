import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { withdrawApi, withdrawHistoryApi } from "../api/withdraw";

const Withdraw = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await withdrawHistoryApi();
      setHistory(res.data.slice(0, 5)); // 👈 last 5 only
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleWithdraw = async () => {
    if (!amount || amount < 200) {
      alert("Minimum withdrawal amount is ₹200");
      return;
    }

    if (!upiId) {
      alert("Please enter UPI ID");
      return;
    }

    try {
      setLoading(true);
      await withdrawApi({ amount, upiId });

      navigate("/wallet", {
        state: {
          success: true,
          message:
            "✅ Withdrawal request submitted successfully. It will be processed soon."
        }
      });
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Failed to submit withdrawal request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white px-4 py-6">

      {/* HEADER */}
      <div className="max-w-md mx-auto mb-6">
        <h2 className="text-xl font-bold">Withdraw</h2>
        <p className="text-sm text-gray-400">
          Withdraw money to your UPI
        </p>
      </div>

      {/* WITHDRAW CARD */}
      <div className="max-w-md mx-auto bg-[#0f172a] rounded-2xl p-5 border border-white/10">

        <label className="block text-sm text-gray-400 mb-2">
          Enter Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Minimum ₹200"
        />

        <label className="block text-sm text-gray-400 mt-4 mb-2">
          UPI ID
        </label>
        <input
          type="text"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="example@upi"
        />

        <p className="text-xs text-gray-400 mt-4">
          • Minimum withdrawal ₹200 <br />
          • Bonus balance not withdrawable <br />
          • Withdrawals are processed manually
        </p>

        <button
          onClick={handleWithdraw}
          disabled={loading}
          className="w-full mt-6 bg-green-500 text-black py-3 rounded-xl font-semibold hover:bg-green-600 transition disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Withdraw Now"}
        </button>
      </div>

      {/* ================= RECENT WITHDRAW HISTORY ================= */}
      <section className="max-w-md mx-auto mt-10">

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Recent Withdrawals
          </h3>
          <span
            onClick={() => navigate("/wallet/withdraw-history")}
            className="text-sm text-yellow-400 cursor-pointer"
          >
            View All →
          </span>
        </div>

        {loadingHistory && (
          <p className="text-sm text-gray-400">
            Loading withdraw history...
          </p>
        )}

        {!loadingHistory && history.length === 0 && (
          <p className="text-sm text-gray-400">
            No withdrawals yet
          </p>
        )}

        {history.map((item) => (
          <WithdrawRow key={item._id} item={item} />
        ))}
      </section>
    </div>
  );
};

/* ================= WITHDRAW ROW ================= */

const WithdrawRow = ({ item }) => {
  const statusColor =
    item.status === "APPROVED"
      ? "text-green-400"
      : item.status === "REJECTED"
      ? "text-red-400"
      : "text-yellow-400";

  return (
    <div className="bg-[#0f172a] border border-white/10 rounded-xl p-4 mb-3 flex justify-between items-center">
      <div>
        <p className="font-semibold text-sm">
          ₹{item.amount}
        </p>
        <p className="text-xs text-gray-400">
          {new Date(item.createdAt).toLocaleString()}
        </p>
      </div>

      <span
        className={`text-xs font-bold px-3 py-1 rounded-full bg-black/30 ${statusColor}`}
      >
        {item.status}
      </span>
    </div>
  );
};

export default Withdraw;
