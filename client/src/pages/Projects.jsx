import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {
    if (!title) return alert("Project title required");

    try {
      await axios.post(
        "https://smart-task-manager-production-9b6f.up.railway.app/api/projects",
        {
          title,
          description,
          members: [],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTitle("");
      setDescription("");
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.msg || "Error creating project");
    }
  };

  return (
    <Layout>
      <div>
        <h2 className="text-2xl font-bold mb-6">Projects</h2>

        {role === "admin" ? (
          <div className="bg-white p-6 rounded-2xl shadow mb-8 flex flex-col md:flex-row gap-4">
            <input
              placeholder="Project Title"
              className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              placeholder="Description"
              className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              onClick={createProject}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition"
            >
              Add
            </button>
          </div>
        ) : (
          <p className="text-gray-500 mb-6">
            Only admins can create projects
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              onClick={() => {
                localStorage.setItem("projectId", project._id);
                window.location.href = "/tasks";
              }}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition cursor-pointer border border-gray-100"
            >
              <h3 className="text-lg font-semibold mb-2">
                {project.title}
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                {project.description || "No description"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Projects;