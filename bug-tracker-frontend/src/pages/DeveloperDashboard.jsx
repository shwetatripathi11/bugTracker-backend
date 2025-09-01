import React, { useState, useEffect } from "react";
import axios from "axios";

function DeveloperDashboard() {
  const [bugs, setBugs] = useState([]);
  const token = localStorage.getItem("token");

  // ✅ Fetch all bugs (in real app: sirf assigned bugs)
  const fetchBugs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/bugs", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBugs(res.data);
    } catch (err) {
      alert("Error fetching bugs");
    }
  };

  // ✅ Update bug status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/bugs/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBugs(); // refresh list after update
    } catch (err) {
      alert(err.response?.data?.message || "Error updating status");
    }
  };

  useEffect(() => { fetchBugs(); }, []);

  return (
    <div>
      <h2>Developer Dashboard</h2>
      <h3>Assigned Bugs</h3>
      <ul>
        {bugs.map(b => (
          <li key={b.id}>
            <strong>{b.title}</strong> - {b.description} 
            [Severity: {b.severity}] - Status: {b.status}
            <div>
              <button onClick={() => updateStatus(b.id, "in_progress")}>In Progress</button>
              <button onClick={() => updateStatus(b.id, "resolved")}>Resolve</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeveloperDashboard;
