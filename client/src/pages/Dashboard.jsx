import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Dashboard() {
  const [data, setData] = useState({});
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "https://smart-task-manager-production-f8a5.up.railway.app/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(res.data);
    } catch (err) {
      console.log("DASHBOARD ERROR:", err.message);
    }
  };

  useEffect(() => {
    fetchDashboard();

    const handleStorageChange = () => {
      fetchDashboard();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Welcome back</h2>
          <p className="text-gray-500 text-sm">
            Here's what's happening with your tasks today
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow">
          <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{user?.email}</p>
            <p className="text-xs text-gray-500">{role}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
          <p className="opacity-80">Total Tasks</p>
          <h2 className="text-3xl font-bold mt-2">
            {data.total || 0}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-2xl shadow-lg">
          <p className="opacity-80">Completed</p>
          <h2 className="text-3xl font-bold mt-2">
            {data.completed || 0}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-2xl shadow-lg">
          <p className="opacity-80">Pending</p>
          <h2 className="text-3xl font-bold mt-2">
            {data.pending || 0}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-6 rounded-2xl shadow-lg">
          <p className="opacity-80">Overdue</p>
          <h2 className="text-3xl font-bold mt-2">
            {data.overdue || 0}
          </h2>
        </div>

      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-4">Progress</h3>

        <div className="space-y-4">

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Completed</span>
              <span>
                {data.total ? Math.round((data.completed / data.total) * 100) : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: `${data.total ? (data.completed / data.total) * 100 : 0}%`,
                }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Pending</span>
              <span>
                {data.total ? Math.round((data.pending / data.total) * 100) : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{
                  width: `${data.total ? (data.pending / data.total) * 100 : 0}%`,
                }}
              ></div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
