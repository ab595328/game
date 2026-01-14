import { useEffect, useState } from "react";
import { walletHistoryAllApi } from "../api/wallet";

const ITEMS_PER_PAGE = 10;

const WalletHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await walletHistoryAllApi();
      setTransactions(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  // 🔢 Pagination logic
  const totalPages = Math.ceil(
    transactions.length / ITEMS_PER_PAGE
  );

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = transactions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white px-4 py-6">

      {/* HEADER */}
      <div className="max-w-md mx-auto mb-6">
        <h2 className="text-xl font-bold">
          Wallet History
        </h2>
        <p className="text-sm text-gray-400">
          All transactions
        </p>
      </div>

      {/* LIST */}
      <div className="max-w-md mx-auto space-y-3">

        {loading && (
          <p className="text-gray-400 text-sm">
            Loading transactions...
          </p>
        )}

        {!loading && transactions.length === 0 && (
          <p className="text-gray-400 text-sm">
            No transactions found
          </p>
        )}

        {currentItems.map((tx) => (
          <TransactionRow key={tx._id} tx={tx} />
        ))}
      </div>

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <div className="max-w-md mx-auto flex justify-between items-center mt-6">

          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg bg-[#0f172a] border border-white/10 disabled:opacity-40"
          >
            ◀ Prev
          </button>

          <p className="text-sm text-gray-400">
            Page {page} of {totalPages}
          </p>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg bg-[#0f172a] border border-white/10 disabled:opacity-40"
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
};

const TransactionRow = ({ tx }) => {
  const isCredit = tx.total > 0;

  return (
    <div className="bg-[#0f172a] border border-white/10 rounded-xl p-4 flex justify-between items-center">
      <div>
        <p className="text-sm font-semibold">
          {tx.description}
        </p>
        <p className="text-xs text-gray-400">
          {new Date(tx.createdAt).toLocaleString()}
        </p>
      </div>

      <p
        className={`font-bold ${
          isCredit
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        {isCredit ? "+" : "-"}₹{Math.abs(tx.total)}


      </p>
    </div>
  );
};

export default WalletHistory;
