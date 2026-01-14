import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/auth";
import bg from "../assets/teenpatti-bg.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginApi(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT SIDE – TEEN PATTI IMAGE */}
      <div
        className="hidden md:block bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* optional text */}
        <div className="absolute bottom-10 left-10 text-white z-10">
          <h1 className="text-4xl font-extrabold tracking-widest text-yellow-400">
            TEEN PATTI
          </h1>
          <p className="text-green-300 mt-2">
            Play • Win • Rule the Table
          </p>
        </div>
      </div>

      {/* RIGHT SIDE – LOGIN */}
      <div
        className="
          flex items-center justify-center
          bg-[radial-gradient(circle_at_top,_#14532d,_#020617_70%)]
        "
      >
        <form
          onSubmit={handleSubmit}
          className="
            bg-black/70
            backdrop-blur-md
            border border-yellow-500/40
            shadow-[0_0_40px_rgba(234,179,8,0.35)]
            p-10
            rounded-2xl
            w-[380px]
          "
        >
          {/* TITLE */}
          <h2 className="text-4xl text-center font-extrabold tracking-widest text-yellow-400">
            LOGIN
          </h2>
          <p className="text-center text-green-400 mb-8">
            Enter the Game
          </p>

          {/* EMAIL */}
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="
              w-full p-3 rounded
              bg-black/60 text-white
              border border-green-500/30
              focus:outline-none
              focus:border-yellow-400
              focus:shadow-[0_0_12px_rgba(234,179,8,0.6)]
              transition
            "
          />

          {/* PASSWORD */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="
              w-full p-3 rounded mt-4
              bg-black/60 text-white
              border border-green-500/30
              focus:outline-none
              focus:border-yellow-400
              focus:shadow-[0_0_12px_rgba(234,179,8,0.6)]
              transition
            "
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="
              w-full mt-6 p-3 rounded-xl
              bg-gradient-to-r from-yellow-400 to-yellow-600
              text-black font-bold tracking-widest
              hover:from-yellow-300 hover:to-yellow-500
              shadow-[0_0_20px_rgba(234,179,8,0.7)]
              active:scale-95
              transition
            "
          >
            PLAY NOW
          </button>

          {/* SIGNUP LINK */}
          <p className="mt-6 text-center text-sm text-gray-300">
            New Player?{" "}
            <span
              className="text-green-400 cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Create Account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
