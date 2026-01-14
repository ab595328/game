import React from "react";
import { useEffect, useState } from "react";
import { getMeApi } from "../api/user";
import { useNavigate } from "react-router-dom";

const Profile = () => {
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
      console.error(err);
      alert("Failed to load profile");
    }
  };

  if (!user) return null;



const handleLogout = () => {
  // 1️⃣ Token remove
  localStorage.removeItem("token");

  // 2️⃣ Optional: other user data clear
  localStorage.removeItem("user");

  // 3️⃣ Login page par redirect
  navigate("/login", { replace: true });
};

  return (
    <div className="max-w-md md:max-w-3xl lg:max-w-6xl mx-auto px-4">

      {/* ================= PROFILE HEADER ================= */}
      <div className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 flex gap-4 items-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-xl bg-white/20 flex items-center justify-center text-4xl font-bold text-white">
            {user.username[0].toUpperCase()}
          </div>
          
        </div>

        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            {user.username}
            <span className="text-[10px] bg-yellow-400 text-black px-2 rounded">
              GOLD
            </span>
          </h2>
          <p className="text-sm text-gray-200">
            {user.email}
          </p>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-3 gap-4 text-center mt-6">
        <Stat label="Wins" value="582" />
        <Stat label="Games" value="847" />
        <Stat label="Win Rate" value="68.7%" highlight />
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="bg-white/5 rounded-2xl mt-6 divide-y divide-white/10">
        <ActionItem label="Edit Profile" icon="✏️" onClick={() => navigate("/profile/edit")} />
        <ActionItem label="Game History" icon="📜" />
        <ActionItem label="Share Profile" icon="🔗" />
      </div>

      {/* ================= ACHIEVEMENTS ================= */}
      <section className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Achievements</h3>

        <div className="grid grid-cols-2 gap-4">

          <AchievementCard
            title="First Win"
            desc="Win your first game"
            color="bg-yellow-600"
            done
          />

          <AchievementCard
            title="Winning Streak"
            desc="Win 5 games in a row"
            color="bg-purple-600"
            done
          />

          <AchievementCard
            title="High Roller"
            desc="Bet ₹50,000 in a single game"
            color="bg-orange-600"
            done
          />

          <AchievementCard
            title="Century"
            desc="Play 100 games"
            color="bg-white/10"
            progress="84/100"
          />

        </div>
      </section>

      {/* ================= LOGOUT ================= */}
   <button
  onClick={handleLogout}
  className="mt-10 mb-10 w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold"
>
  Logout
</button>

    </div>
  );
};

/* ================= COMPONENTS ================= */

const Stat = ({ label, value, highlight }) => (
  <div className="bg-white/5 rounded-xl p-4">
    <p className="text-sm text-gray-400">{label}</p>
    <p className={`text-lg font-bold ${highlight ? "text-green-400" : ""}`}>
      {value}
    </p>
  </div>
);

const ActionItem = ({ label, icon, onClick }) => (
  <div
    onClick={onClick}
    className="flex justify-between items-center p-4 cursor-pointer hover:bg-white/5"
  >
    <div className="flex items-center gap-3">
      <span>{icon}</span>
      <span>{label}</span>
    </div>
    <span>›</span>
  </div>
);

const AchievementCard = ({ title, desc, color, done, progress }) => (
  <div className={`rounded-xl p-4 ${color}`}>
    <div className="flex justify-between items-center">
      <h4 className="font-semibold text-sm">{title}</h4>
      {done && <span className="text-xs">✅</span>}
    </div>

    <p className="text-xs opacity-90 mt-1">{desc}</p>

    {progress && (
      <div className="mt-3">
        <div className="w-full bg-black/30 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: "84%" }}
          />
        </div>
        <p className="text-xs mt-1">{progress}</p>
      </div>
    )}
  </div>
);

export default Profile;
