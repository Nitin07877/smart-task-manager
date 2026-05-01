import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await axios.post("https://smart-task-manager-production-f8a5.up.railway.app/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/dashboard";

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white items-center justify-center p-10">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Team Task Manager
          </h1>
          <p className="text-lg opacity-90 leading-relaxed">
            Organize projects, assign tasks, and track progress with a modern workflow built for teams.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">

        <div className="bg-white p-10 rounded-3xl shadow-2xl w-96">

          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Login to continue
          </p>

          <input
            type="email"
            placeholder="Email address"
            className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full p-3 rounded-xl font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => (window.location.href = "/signup")}
              className="text-indigo-600 font-semibold cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
