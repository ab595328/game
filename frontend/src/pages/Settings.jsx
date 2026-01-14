import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 text-white">
      <h2 className="text-xl font-bold mb-6">⚙️ Settings</h2>

      <div className="bg-[#0f172a] rounded-2xl divide-y divide-white/10">

        <SettingItem
          label="Edit Profile"
          onClick={() => navigate("/profile/edit")}
        />

        <SettingItem
          label="Change Password"
          onClick={() => navigate("/profile/edit")}
        />

        <SettingItem
          label="Logout"
          danger
          onClick={handleLogout}
        />

      </div>
    </div>
  );
};

const SettingItem = ({ label, onClick, danger }) => (
  <div
    onClick={onClick}
    className={`p-4 cursor-pointer flex justify-between items-center ${
      danger
        ? "text-red-400 hover:bg-red-500/10"
        : "hover:bg-white/5"
    }`}
  >
    <span>{label}</span>
    <span>›</span>
  </div>
);

export default Settings;
