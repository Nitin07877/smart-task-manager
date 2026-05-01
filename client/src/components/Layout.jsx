import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex h-screen bg-gray-100">

      <div className="w-64 bg-gradient-to-b from-indigo-600 to-indigo-700 text-white shadow-xl p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-10 tracking-wide">
          TaskManager
        </h1>

        <ul className="space-y-3 flex-1">
          <li
            onClick={() => navigate("/dashboard")}
            className="p-3 rounded-lg hover:bg-indigo-500 cursor-pointer transition"
          >
            Dashboard
          </li>

          {role === "admin" && (
            <li
              onClick={() => navigate("/projects")}
              className="p-3 rounded-lg hover:bg-indigo-500 cursor-pointer transition"
            >
              Projects
            </li>
          )}

          {role === "admin" && (
            <li
              onClick={() => navigate("/users")}
              className="p-3 rounded-lg hover:bg-indigo-500 cursor-pointer transition"
            >
              Users
            </li>
          )}

          <li
            onClick={() => navigate("/tasks")}
            className="p-3 rounded-lg hover:bg-indigo-500 cursor-pointer transition"
          >
            Tasks
          </li>
        </ul>

        <div className="text-sm opacity-80 mt-6">
          {user?.email}
        </div>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">

        <div className="flex justify-between items-center mb-6 bg-white p-5 rounded-xl shadow">
          <div>
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <p className="text-sm text-gray-500">
              {role}
            </p>
          </div>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Layout;