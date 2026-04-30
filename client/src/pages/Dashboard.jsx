import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5001/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => setData(res.data));
  }, []);

  return (
    <div style={{ padding: "50px" }}>
      <h2>Dashboard</h2>
      <p>Total Tasks: {data.total}</p>
      <p>Completed: {data.completed}</p>
      <p>Pending: {data.pending}</p>
      <p>Overdue: {data.overdue}</p>
    </div>
  );
}

export default Dashboard;