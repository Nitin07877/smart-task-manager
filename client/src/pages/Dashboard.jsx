import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Dashboard() {
  const [data, setData] = useState({});

  const token = localStorage.getItem("token");

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/dashboard",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

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
    </Layout>
  );
}

export default Dashboard;