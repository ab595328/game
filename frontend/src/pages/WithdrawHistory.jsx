import { useEffect, useState } from "react";
import { withdrawHistoryApi } from "../api/withdraw";

const WithdrawHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await withdrawHistoryApi();
      setHistory(res.data || []);
    } catch (err) {
      alert("Failed to load withdraw history");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white px-4 py-6">

      {/* HEADER */}
      <div className="max-w-md mx-auto mb-6">
        <h2 className="text-xl font-bold">
          Withdraw History
        </h2>
        <p className="text-sm text-gray-400">
          Track your withdrawal requests
        </p>
      </div>

      {/* LIST */}
      <div className="max-w-md mx-auto space-y-3">

        {loading && (
          <p className="text-gray-400 text-sm">
            Loading history...
          </p>
        )}

        {!loading && history.length === 0 && (
          <p className="text-gray-400 text-sm">
            No withdrawal requests found
          </p>
        )}

        {history.map((item) => (
          <WithdrawRow key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

const WithdrawRow = ({ item }) => {
  const statusColor =
    item.status === "APPROVED"
      ? "text-green-400"
      : item.status === "REJECTED"
      ? "text-red-400"
      : "text-yellow-400";

  return (
    <div className="bg-[#0f172a] border border-white/10 rounded-xl p-4 flex justify-between items-center">
      <div>
        <p className="font-semibold text-sm">
          ₹{item.amount}
        </p>
        <p className="text-xs text-gray-400">
          UPI: {item.upiId}
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

export default WithdrawHistory;
