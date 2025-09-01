import React, { useState, useEffect } from "react";
import axios from "axios";

function TesterDashboard() {
  const [projects, setProjects] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [form, setForm] = useState({ project_id: "", title: "", description: "", severity: "low" });

  const token = localStorage.getItem("token");

  // ✅ Fetch all projects (so tester can choose where to report bug)
  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/projects", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(res.data);
    } catch (err) {
      alert("Error fetching projects");
    }
  };

  // ✅ Fetch all bugs
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

  // ✅ Report new bug
  const reportBug = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/bugs", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBugs(); // refresh bug list
      setForm({ project_id: "", title: "", description: "", severity: "low" });
    } catch (err) {
      alert(err.response?.data?.message || "Error reporting bug");
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchBugs();
  }, []);

  return (
    <div>
      <h2>Tester Dashboard</h2>

      <form onSubmit={reportBug}>
        <select value={form.project_id} onChange={(e) => setForm({ ...form, project_id: e.target.value })}>
          <option value="">Select Project</option>
          {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <input 
          placeholder="Bug Title" 
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} 
        />
        <input 
          placeholder="Description" 
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })} 
        />
        <select value={form.severity} onChange={(e) => setForm({ ...form, severity: e.target.value })}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Report Bug</button>
      </form>

      <h3>All Bugs</h3>
      <ul>
        {bugs.map(b => (
          <li key={b.id}>
            <strong>{b.title}</strong> - {b.description} 
            [{b.severity}] - Status: {b.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TesterDashboard;
