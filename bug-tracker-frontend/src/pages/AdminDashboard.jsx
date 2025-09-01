import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  const token = localStorage.getItem("token");

  // ✅ Fetch all projects from backend
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

  // ✅ Create new project
  const createProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/projects", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProjects(); // refresh project list
      setForm({ name: "", description: "" }); // reset form
    } catch (err) {
      alert(err.response?.data?.message || "Error creating project");
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      
      <form onSubmit={createProject}>
        <input 
          placeholder="Project Name" 
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} 
        />
        <input 
          placeholder="Description" 
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })} 
        />
        <button type="submit">Create Project</button>
      </form>

      <h3>All Projects</h3>
      <ul>
        {projects.map(p => (
          <li key={p.id}>{p.name} - {p.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
