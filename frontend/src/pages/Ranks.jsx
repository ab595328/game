import React from "react";

const Ranks = () => {
  return (
    <div className="max-w-md md:max-w-3xl lg:max-w-6xl mx-auto px-4">

      {/* ================= LEADERBOARD HEADER ================= */}
      <div className="mt-4 bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Leaderboard</h2>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              👑
            </div>
            <div>
              <p className="text-xs opacity-80">Your Rank</p>
              <p className="text-xl font-bold">#156</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs opacity-80">Winnings</p>
            <p className="text-xl font-bold">₹2457k</p>
          </div>
        </div>
      </div>

      {/* ================= TOP PLAYERS ================= */}
      <section className="mt-6 mb-10 space-y-4">

        <RankCard
          rank={1}
          name="Vikram Singh"
          games="2341"
          rate="74.2%"
          amount="₹8,956,400"
          highlight
        />

        <RankCard
          rank={2}
          name="Priya Sharma"
          games="1998"
          rate="71.8%"
          amount="₹7,234,500"
        />

        <RankCard
          rank={3}
          name="Amit Patel"
          games="2156"
          rate="69.5%"
          amount="₹6,891,200"
        />

        <RankCard
          rank={4}
          name="Sneha Reddy"
          games="1784"
          rate="67.3%"
          amount="₹5,678,300"
        />

        <RankCard
          rank={5}
          name="Rahul Mehta"
          games="1623"
          rate="65.9%"
          amount="₹4,923,100"
        />

      </section>
    </div>
  );
};

/* ================= COMPONENT ================= */

const RankCard = ({ rank, name, games, rate, amount, highlight }) => {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border ${
        highlight
          ? "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500"
          : "bg-white/5 border-white/10"
      }`}
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <div className="w-10 text-center font-bold">
          {rank <= 3 ? "👑" : `#${rank}`}
        </div>

        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold">
          {name.charAt(0)}
        </div>

        <div>
          <p className="font-semibold text-sm">{name}</p>
          <p className="text-xs text-gray-400">
            {games} games • {rate} win rate
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="text-right">
        <p className="font-bold text-yellow-400">{amount}</p>
        <p className="text-xs text-gray-400">Total Winnings</p>
      </div>
    </div>
  );
};

export default Ranks;
