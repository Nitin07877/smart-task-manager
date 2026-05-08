import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await axios.post("https://smart-task-manager-production-9b6f.up.railway.app/api/auth/login", {
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
    
  <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-purple-50">

    {/* Left Side */}
    <div className="hidden lg:flex w-1/2 items-center justify-center p-16 relative overflow-hidden">

      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-40"></div>

      <div className="relative z-10 max-w-xl">

        <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-8">
          Smart Workflow Platform
        </div>

        <h1 className="text-6xl font-black leading-tight text-gray-900 mb-6">
          Manage Teams
          <span className="block text-indigo-600">
            Effortlessly
          </span>
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed mb-10">
          Organize projects, track tasks, and collaborate with your team using a powerful modern dashboard.
        </p>

        <div className="flex gap-6">

          <div className="bg-white shadow-xl rounded-3xl px-8 py-6">
            <h2 className="text-3xl font-bold text-indigo-600">
              10K+
            </h2>
            <p className="text-gray-500 mt-2">
              Active Teams
            </p>
          </div>

          <div className="bg-white shadow-xl rounded-3xl px-8 py-6">
            <h2 className="text-3xl font-bold text-pink-500">
              99%
            </h2>
            <p className="text-gray-500 mt-2">
              Productivity
            </p>
          </div>

        </div>
      </div>
    </div>

    {/* Right Side */}
    <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">

      <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl p-10 border border-gray-100">

        <div className="mb-8 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-3">
            Welcome Back
          </h2>

          <p className="text-gray-500">
            Login to continue your workspace
          </p>
        </div>

        <div className="space-y-5">

          <div>
            <label className="text-sm font-medium text-gray-600 block mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 block mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full mt-8 py-4 rounded-2xl font-bold text-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white shadow-lg"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-500 mt-8">
          Don’t have an account?{" "}
          <span
            onClick={() => (window.location.href = "/signup")}
            className="text-indigo-600 font-semibold cursor-pointer hover:underline"
          >
            Create Account
          </span>
        </p>

      </div>
    </div>
  </div>
);
}

export default Login;
