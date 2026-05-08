import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Users() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://smart-task-manager-production-9b6f.up.railway.app/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id, role) => {
    try {
      await axios.patch(
        `https://smart-task-manager-production-9b6f.up.railway.app/api/users/role/${id}`,
        { role },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUsers();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <Layout>
      <div>
        <h2 className="text-2xl font-bold mb-6">Users</h2>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-50 px-6 py-3 text-sm font-semibold text-gray-600">
            <span>Email</span>
            <span>Role</span>
            <span className="text-right">Change</span>
          </div>

          {users.map((user) => (
            <div
              key={user._id}
              className="grid grid-cols-3 items-center px-6 py-4 border-t hover:bg-gray-50 transition"
            >
              <p className="font-medium text-gray-800 truncate">
                {user.email}
              </p>

              <span
                className={`text-xs px-3 py-1 rounded-full w-fit ${
                  user.role === "admin"
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {user.role}
              </span>

              <div className="flex justify-end">
                <select
                  value={user.role}
                  onChange={(e) =>
                    updateRole(user._id, e.target.value)
                  }
                  className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Users;