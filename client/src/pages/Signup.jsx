import { useState } from "react";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);

      await axios.post("https://smart-task-manager-production-f8a5.up.railway.app/api/auth/signup", {
        name,
        email,
        password,
      });

      alert("Account created successfully! Please login.");
      window.location.href = "/";
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.msg || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 text-white items-center justify-center p-10">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Team Task Manager
          </h1>
          <p className="text-lg opacity-90 leading-relaxed">
            Join your team workspace and manage projects, tasks, and progress efficiently.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-96">

          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Create Account
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Get started in seconds
          </p>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignup}
            disabled={loading}
            className={`w-full p-3 rounded-xl font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 text-white shadow-md"
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-5">
            Already have an account?{" "}
            <span
              onClick={() => (window.location.href = "/")}
              className="text-purple-600 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Signup;
