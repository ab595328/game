import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getMeApi } from "../api/user";

const MainLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const res = await getMeApi();
      setUser(res.data);
    } catch (err) {
      console.error("Failed to load user in header");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1324] to-[#020617] text-white">

      {/* ================= HEADER (FIXED) ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#020617] border-b border-gray-800">
        <div className="max-w-md md:max-w-3xl lg:max-w-6xl mx-auto flex justify-between items-center px-4 py-4">

          {/* LEFT: USER */}
          <div
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-bold">
              {user?.username?.[0]?.toUpperCase() || "U"}
            </div>

            <div>
              <p className="font-semibold text-sm">
                {user?.username || "User"}
              </p>
              <span className="text-[10px] bg-yellow-400 text-black px-2 rounded">
                ADMIN
              </span>
            </div>
          </div>

          {/* RIGHT: ICONS */}
          <div className="flex gap-4 text-lg">
            <button
              onClick={() => navigate("/offers")}
              className="hover:text-yellow-400"
              title="Offers"
            >
              🎁
            </button>

            <button
              onClick={() => navigate("/notifications")}
              className="hover:text-yellow-400"
              title="Notifications"
            >
              🔔
            </button>

            <button
              onClick={() => navigate("/settings")}
              className="hover:text-yellow-400"
              title="Settings"
            >
              ⚙️
            </button>
          </div>

        </div>
      </header>

      {/* ================= PAGE CONTENT ================= */}
      <main className="pt-20 pb-24">
        <Outlet />
      </main>

      {/* ================= BOTTOM NAV (FIXED) ================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#020617] border-t border-gray-800">
        <div className="max-w-md md:max-w-3xl lg:max-w-6xl mx-auto flex justify-around py-3 text-xs">

          <NavItem icon="🏠" label="Home" onClick={() => navigate("/dashboard")} />
          <NavItem icon="🎮" label="Games" onClick={() => navigate("/games")} />
          <NavItem icon="💰" label="Wallet" onClick={() => navigate("/wallet")} />
          <NavItem icon="🏆" label="Ranks" onClick={() => navigate("/ranks")} />
          <NavItem icon="👤" label="Profile" onClick={() => navigate("/profile")} />

        </div>
      </nav>
    </div>
  );
};

const NavItem = ({ icon, label, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer text-center opacity-80 hover:opacity-100 transition"
  >
    <div className="text-lg">{icon}</div>
    <p>{label}</p>
  </div>
);

export default MainLayout;
