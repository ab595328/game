import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMeApi, updateProfileApi } from "../api/user";

const EditProfile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const res = await getMeApi();
    setForm({
      username: res.data.username,
      email: res.data.email,
      password: ""
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await updateProfileApi(form);
      navigate("/profile");
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white px-4 py-6">

      <div className="max-w-md mx-auto bg-[#0f172a] rounded-2xl p-6 border border-white/10">

        <h2 className="text-xl font-bold mb-4">
          Edit Profile
        </h2>

        {/* USERNAME */}
        <label className="block text-sm text-gray-400 mb-1">
          Username
        </label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 mb-4"
        />

        {/* EMAIL */}
        <label className="block text-sm text-gray-400 mb-1">
          Email
        </label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 mb-4"
        />

        {/* PASSWORD */}
        <label className="block text-sm text-gray-400 mb-1">
          New Password (optional)
        </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 mb-6"
          placeholder="Leave blank to keep same"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-yellow-400 text-black py-3 rounded-xl font-semibold hover:bg-yellow-500 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>
    </div>
  );
};

export default EditProfile;
