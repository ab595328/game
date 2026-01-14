import React from "react";
import { useNavigate } from "react-router-dom";

const Games = () => {

  return (
    <div className="max-w-md md:max-w-3xl lg:max-w-6xl mx-auto px-4">

      {/* ================= PAGE TITLE ================= */}
      <div className="mt-4 mb-6">
        <h2 className="text-xl font-bold">🎮 Game Modes</h2>
        <p className="text-sm text-gray-400">
          Choose your favorite Teen Patti variant
        </p>
      </div>

      {/* ================= GAMES LIST ================= */}
      <div className="space-y-6 mb-10">

        {/* Classic Teen Patti */}
        <GameCard
          title="Classic Teen Patti"
          online="2.8k"
          min="₹100"
          badge="POPULAR"
          gradient="from-blue-600 to-blue-800"
        />



        {/* (Future games yahin add honge) */}


      </div>
    </div>
  );
};

/* ================= REUSABLE GAME CARD ================= */

const GameCard = ({ title, online, min, badge, gradient }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#0f172a] rounded-2xl overflow-hidden shadow-lg border border-white/5">

      {/* TOP IMAGE / BANNER */}
      <div
        className={`h-32 bg-gradient-to-br ${gradient} relative flex items-center justify-center`}
      >
        <div className="absolute top-3 right-3 bg-red-500 text-xs px-2 py-1 rounded-full">
          {badge}
        </div>

        {/* Dummy chips image effect */}
        <div className="opacity-30 text-5xl">🪙🪙</div>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>

        <div className="flex justify-between items-center text-sm text-gray-400 mt-2">
          <span>👥 {online} online</span>
          <span className="text-yellow-400 font-semibold">
            Min: {min}
          </span>
        </div>

        <button
          onClick={() => navigate("/game/teen-patti")}
          className="bg-yellow-400 text-black px-6 py-3 rounded"
        >
          Play Teen Patti
        </button>
      </div>
    </div>
  );
};

export default Games;
