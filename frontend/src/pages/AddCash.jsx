import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCashApi } from "../api/wallet";

export default function AddCash() {
    const [amount, setAmount] = useState(100);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAddCash = async () => {
        if (amount < 100) {
            alert("Minimum amount is ₹100");
            return;
        }

        try {
            setLoading(true);
            await addCashApi(amount);
            navigate("/wallet", {
                state: {
                    success: true,
                    message: `🎉 Congratulations! ₹${amount} successfully added to your wallet.`
                }
            });

        } catch (error) {
            alert(
                error?.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white px-4 py-6">

            {/* HEADER */}
            <div className="max-w-md mx-auto mb-6">
                <h2 className="text-xl font-bold">Add Cash</h2>
                <p className="text-sm text-gray-400">
                    Add money to your wallet
                </p>
            </div>

            {/* CARD */}
            <div className="max-w-md mx-auto bg-[#0f172a] rounded-2xl p-5 border border-white/10">

                {/* AMOUNT INPUT */}
                <label className="block text-sm text-gray-400 mb-2">
                    Enter Amount
                </label>

                <input
                    type="number"
                    min="100"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Minimum ₹100"
                />

                {/* QUICK AMOUNTS */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                    {[500, 1000, 2000].map((val) => (
                        <button
                            key={val}
                            onClick={() => setAmount(val)}
                            className="bg-[#020617] border border-white/10 py-2 rounded-xl hover:border-yellow-400 transition"
                        >
                            ₹{val}
                        </button>
                    ))}
                </div>

                {/* INFO */}
                <p className="text-xs text-gray-400 mt-4">
                    • Minimum deposit ₹100 <br />
                    • No bonus on Add Cash
                </p>

                {/* ACTION BUTTON */}
                <button
                    onClick={handleAddCash}
                    disabled={loading}
                    className="w-full mt-6 bg-yellow-400 text-black py-3 rounded-xl font-semibold hover:bg-yellow-500 transition disabled:opacity-60"
                >
                    {loading ? "Processing..." : `Add ₹${amount}`}
                </button>
            </div>
        </div>
    );
}
