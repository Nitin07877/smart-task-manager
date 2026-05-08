import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(
    localStorage.getItem("projectId") || ""
  );

  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fetchProjects = async () => {
    try {
      const res = await axios.get("https://smart-task-manager-production-9b6f.up.railway.app/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data || []);
    } catch (err) {
      console.log("PROJECT ERROR:", err.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://smart-task-manager-production-9b6f.up.railway.app/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data || []);
    } catch (err) {
      console.log("USER ERROR:", err.message);
    }
  };

  const fetchTasks = async () => {
    try {
      if (!selectedProject) {
        setTasks([]);
        return;
      }

      const res = await axios.get(
        `https://smart-task-manager-production-9b6f.up.railway.app/api/tasks/${selectedProject}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks(res.data || []);
    } catch (err) {
      console.log("TASK ERROR:", err.message);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [selectedProject]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = localStorage.getItem("taskUpdated");
      if (updated) {
        fetchTasks();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const createTask = async () => {
    if (!selectedProject) {
      alert("Select a project first");
      return;
    }

    if (!title || !deadline || !assignedTo) {
      alert("Fill all fields");
      return;
    }

    try {
      await axios.post(
        "https://smart-task-manager-production-9b6f.up.railway.app/api/tasks",
        {
          title,
          projectId: selectedProject,
          assignedTo,
          deadline,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTitle("");
      setDeadline("");
      setAssignedTo("");

      fetchTasks();
    } catch (err) {
      alert("Error creating task");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `https://smart-task-manager-production-9b6f.up.railway.app/api/tasks/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.setItem("taskUpdated", Date.now());
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div>
        <h2 className="text-2xl font-bold mb-4">Tasks</h2>

        <div className="mb-6">
          <select
            value={selectedProject}
            onChange={(e) => {
              setSelectedProject(e.target.value);
              localStorage.setItem("projectId", e.target.value);
            }}
            className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>

        {role === "admin" && selectedProject && (
          <div className="bg-white p-6 rounded-2xl shadow mb-8 flex flex-col md:flex-row gap-4">
            <input
              placeholder="Task title"
              className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="date"
              className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />

            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Assign member</option>
              {users
                .filter((u) => u.role === "member")
                .map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name || u.email}
                  </option>
                ))}
            </select>

            <button
              onClick={createTask}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition"
            >
              Add
            </button>
          </div>
        )}

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">{task.title}</h3>

                <p className="text-sm text-gray-500">
                  Assigned: {task.assignedTo?.name || "You"}
                </p>

                <p className="text-sm mt-1">
                  Status:
                  <span
                    className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                      task.status === "done"
                        ? "bg-green-100 text-green-700"
                        : task.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </p>
              </div>

              <select
                value={task.status}
                onChange={(e) =>
                  updateStatus(task._id, e.target.value)
                }
                className="border border-gray-300 p-2 rounded-lg"
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          ))}
        </div>

        {!selectedProject && (
          <p className="text-gray-500 text-center mt-10">
            Please select a project
          </p>
        )}

        {selectedProject && tasks.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            No tasks found in this project
          </p>
        )}
      </div>
    </Layout>
  );
}

export default Tasks;