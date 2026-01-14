const Offers = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-6 text-white">
      <h2 className="text-xl font-bold mb-2">🎁 Offers</h2>
      <p className="text-sm text-gray-400 mb-6">
        Available offers & bonuses
      </p>

      <div className="space-y-4">

        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-5">
          <h3 className="font-semibold">Welcome Bonus</h3>
          <p className="text-sm mt-1">
            Add ₹10,000 & get 20% bonus
          </p>
        </div>

        <div className="bg-[#0f172a] rounded-2xl p-5 border border-white/10">
          <h3 className="font-semibold">Daily Cashback</h3>
          <p className="text-sm mt-1 text-gray-400">
            Get up to 5% cashback on losses
          </p>
        </div>

      </div>
    </div>
  );
};

export default Offers;
