import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupApi } from "../api/auth";
import bg from "../assets/teenpatti-bg.jpg";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupApi(form);
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
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

        {/* text */}
        <div className="absolute bottom-10 left-10 text-white z-10">
          <h1 className="text-4xl font-extrabold tracking-widest text-yellow-400">
            TEEN PATTI
          </h1>
          <p className="text-green-300 mt-2">
            Create your player & join the table
          </p>
        </div>
      </div>

      {/* RIGHT SIDE – SIGNUP */}
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
            SIGN UP
          </h2>
          <p className="text-center text-green-400 mb-8">
            Create Player Account
          </p>

          {/* USERNAME */}
          <input
            name="username"
            placeholder="Username"
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

          {/* EMAIL */}
          <input
            name="email"
            placeholder="Email"
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
            REGISTER
          </button>

          {/* LOGIN LINK */}
          <p className="mt-6 text-center text-sm text-gray-300">
            Already a Player?{" "}
            <span
              className="text-green-400 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
