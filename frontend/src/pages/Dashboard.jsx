import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1324] to-[#020617] text-white pb-24">
      
      {/* MAIN CONTAINER */}
      <div className="max-w-md md:max-w-3xl lg:max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}
        {/* <header className="flex justify-between items-center px-4 py-4">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/80"
              alt="profile"
              className="w-12 h-12 rounded-xl border-2 border-yellow-400"
            />
            <div>
              <p className="font-semibold">Rajesh Kumar</p>
              <p className="text-xs text-gray-400">@rajesh_king</p>
              <span className="text-[10px] bg-yellow-400 text-black px-2 rounded">
                GOLD
              </span>
            </div>
          </div>

          <div className="flex gap-4 text-xl">
            <span>🎁</span>
            <span className="relative">
              🔔
              <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </span>
            <span>⚙️</span>
          </div>
        </header> */}

        {/* ================= TOP GRID (DESKTOP) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">

          {/* BALANCE CARD */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex justify-between text-sm opacity-80">
                <span>Total Balance</span>
                <span>👁️</span>
              </div>

              <h1 className="text-3xl font-bold mt-2">₹125,840</h1>
              <p className="text-xs opacity-70">Bonus: ₹12,500</p>

              <div className="flex gap-3 mt-5">
                <button className="flex-1 bg-white text-purple-700 py-2 rounded-xl font-semibold">
                  + Add Cash
                </button>
                <button className="flex-1 border border-white py-2 rounded-xl">
                  Withdraw
                </button>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4 text-center text-sm">
            <Stat icon="🏆" value="582" label="Wins" />
            <Stat icon="🎮" value="847" label="Games" />
            <Stat icon="📈" value="68.7%" label="Win Rate" />
            <Stat icon="🥇" value="#156" label="Rank" />
          </div>
        </div>

        {/* ================= DAILY BONUS ================= */}
        <section className="px-4 mt-8">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6">
            <h3 className="font-semibold text-lg">✨ Daily Bonus</h3>
            <p className="text-sm opacity-90">
              Login daily to claim amazing rewards!
            </p>
            <button className="mt-4 bg-white text-orange-600 px-6 py-2 rounded-xl font-semibold">
              Claim Now
            </button>
          </div>
        </section>

        {/* ================= QUICK PLAY ================= */}
        <section className="px-4 mt-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Quick Play</h3>
            <span className="text-green-400 text-xs">● 3.2k Online</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GameCard
              badge="POPULAR"
              color="bg-blue-700"
              title="Classic Teen Patti"
              min="₹100"
            />
            <GameCard
              badge="HOT"
              color="bg-red-700"
              title="Rapid Fire"
              min="₹500"
            />
          </div>
        </section>
        {/* ================= TOURNAMENTS ================= */}
<section className="px-4 mt-10">
  <h3 className="text-lg font-semibold mb-4">🏆 Tournaments</h3>

  {/* Tournament Card */}
  <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-5 mb-5">
    <div className="flex justify-between items-center">
      <h4 className="font-semibold">Mega Monday Tournament</h4>
      <span className="text-xs bg-green-500 px-2 py-1 rounded">UPCOMING</span>
    </div>

    <p className="text-xs opacity-90 mt-1">Today 8:00 PM</p>

    <div className="bg-emerald-900/60 rounded-xl p-4 text-center mt-4">
      <p className="text-sm">Prize Pool</p>
      <h2 className="text-2xl font-bold text-green-400">₹500,000</h2>
    </div>

    <div className="grid grid-cols-2 gap-4 text-sm mt-4">
      <div>Participants: <b>234/500</b></div>
      <div>Entry Fee: <b className="text-yellow-400">₹1,000</b></div>
    </div>

    <div className="mt-4">
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div className="bg-orange-400 h-2 rounded-full w-[47%]"></div>
      </div>
      <p className="text-xs mt-1">47% Spots Filled</p>
    </div>

    <button
      className="mt-4 w-full bg-yellow-400 text-black py-2 rounded-xl font-semibold"
      onClick={() => window.location.href = "/tournaments"}
    >
      Register Now
    </button>
  </div>
</section>
{/* ================= RECENT ACTIVITY ================= */}
<section className="px-4 mt-10 mb-10">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-semibold">📈 Recent Activity</h3>
    <span
      className="text-sm text-yellow-400 cursor-pointer"
      onClick={() => window.location.href = "/activity"}
    >
      View All
    </span>
  </div>

  {/* Won */}
  <div className="bg-green-900/40 border border-green-500 rounded-xl p-4 mb-4">
    <p className="font-semibold">
      Classic Teen Patti <span className="text-green-400 text-xs ml-2">Won</span>
    </p>
    <p className="text-xs opacity-80 mt-1">6 Players • 12m • Rank 1</p>
    <p className="text-green-400 font-bold mt-2">+₹5,600</p>
  </div>

  {/* Lost */}
  <div className="bg-red-900/40 border border-red-500 rounded-xl p-4 mb-4">
    <p className="font-semibold">
      Rapid Fire <span className="text-red-400 text-xs ml-2">Lost</span>
    </p>
    <p className="text-xs opacity-80 mt-1">4 Players • 5m • Rank 3</p>
    <p className="text-red-400 font-bold mt-2">-₹2,400</p>
  </div>

  {/* Tournament */}
  <div className="bg-emerald-900/40 border border-emerald-500 rounded-xl p-4">
    <p className="font-semibold">
      Tournament <span className="text-green-400 text-xs ml-2">Won</span>
    </p>
    <p className="text-xs opacity-80 mt-1">24 Players • 45m • Rank 2</p>
    <p className="text-green-400 font-bold mt-2">+₹8,900</p>
  </div>
</section>

      </div>

      {/* ================= BOTTOM NAV ================= */}
      {/* <nav className="fixed bottom-0 w-full bg-[#020617] border-t border-gray-800">
        <div className="max-w-md md:max-w-3xl lg:max-w-6xl mx-auto flex justify-around py-3 text-xs">
        <NavItem label="Home" icon="🏠" path="/dashboard" active />
         <NavItem label="Games" icon="🎮" path="/games" />
          <NavItem label="Wallet" icon="💰" />
          <NavItem label="Ranks" icon="🏆" />
          <NavItem label="Profile" icon="👤" />
        </div>
      </nav> */}
    </div>
  );
};

/* ===== Reusable Components ===== */

const Stat = ({ icon, value, label }) => (
  <div className="bg-white/5 rounded-xl p-4">
    <div className="text-xl">{icon}</div>
    <p className="font-bold">{value}</p>
    <p className="text-gray-400 text-xs">{label}</p>
  </div>
);

const GameCard = ({ badge, color, title, min }) => (
  <div className={`${color} rounded-2xl p-5`}>
    <span className="bg-black/30 text-xs px-2 py-1 rounded-full">
      {badge}
    </span>
    <h4 className="mt-3 font-semibold">{title}</h4>
    <p className="text-sm">Min {min}</p>
    <button className="mt-4 bg-white text-black px-4 py-2 rounded-xl">
      ▶ Play
    </button>
  </div>
);

const NavItem = ({ icon, label, path, active }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(path)}
      className={`text-center cursor-pointer ${active ? "text-yellow-400" : ""}`}
    >
      <div>{icon}</div>
      <p>{label}</p>
    </div>
  );
};

export default Home;
