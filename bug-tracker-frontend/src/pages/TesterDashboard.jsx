// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "animate.css";

// function TesterDashboard() {
//   const [projects, setProjects] = useState([]);
//   const [bugs, setBugs] = useState([]);
//   const [form, setForm] = useState({
//     project_id: "",
//     title: "",
//     description: "",
//     severity: "low"
//   });

//   const token = localStorage.getItem("token");

//   // ✅ Fetch Projects
//   const fetchProjects = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/projects", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setProjects(res.data);
//     } catch (err) {
//       console.error("Error fetching projects:", err);
//     }
//   };

//   // ✅ Fetch Bugs
//   const fetchBugs = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/bugs", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setBugs(res.data);
//     } catch (err) {
//       console.error("Error fetching bugs:", err);
//     }
//   };

//   // ✅ Report Bug
//   const reportBug = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/bugs", form, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       fetchBugs();
//       setForm({ project_id: "", title: "", description: "", severity: "low" });
//     } catch (err) {
//       console.error("Error reporting bug:", err);
//       alert(err.response?.data?.message || "Error reporting bug");
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//     fetchBugs();
//   }, []);

//   return (
//     <div className="container mt-5 animate__animated animate__fadeIn">
//       <h1 className="text-center fw-bold mb-4">Tester Dashboard</h1>

//       {/* Bug Report Form */}
//       <div className="card shadow-lg mb-5">
//         <div className="card-body">
//           <h5 className="card-title mb-3">Report a Bug</h5>
//           <form onSubmit={reportBug}>
//             <div className="mb-3">
//               <label>Select Project</label>
//               <select
//                 className="form-select"
//                 value={form.project_id}
//                 onChange={(e) =>
//                   setForm({ ...form, project_id: e.target.value })
//                 }
//                 required
//               >
//                 <option value="">-- Select Project --</option>
//                 {projects.length > 0 ? (
//                   projects.map((p) => (
//                     <option key={p.id} value={p.id}>
//                       {p.name}
//                     </option>
//                   ))
//                 ) : (
//                   <option disabled>No projects available</option>
//                 )}
//               </select>
//             </div>
//             <div className="mb-3">
//               <label>Bug Title</label>
//               <input
//                 className="form-control"
//                 value={form.title}
//                 onChange={(e) => setForm({ ...form, title: e.target.value })}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label>Description</label>
//               <textarea
//                 className="form-control"
//                 value={form.description}
//                 onChange={(e) =>
//                   setForm({ ...form, description: e.target.value })
//                 }
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label>Severity</label>
//               <select
//                 className="form-select"
//                 value={form.severity}
//                 onChange={(e) => setForm({ ...form, severity: e.target.value })}
//               >
//                 <option value="low">Low</option>
//                 <option value="medium">Medium</option>
//                 <option value="high">High</option>
//               </select>
//             </div>
//             <button className="btn btn-danger w-100">Report Bug</button>
//           </form>
//         </div>
//       </div>

//       {/* Bugs Table */}
//       <h4 className="mb-3">All Reported Bugs</h4>
//       <div className="table-responsive animate__animated animate__fadeInUp">
//         <table className="table table-striped table-hover shadow-sm">
//           <thead className="table-dark">
//             <tr>
//               <th>ID</th>
//               <th>Project</th>
//               <th>Title</th>
//               <th>Description</th>
//               <th>Severity</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bugs.length > 0 ? (
//               bugs.map((b) => (
//                 <tr key={b.id}>
//                   <td>{b.id}</td>
//                   {/* ✅ Project ka name dikhane ke liye */}
//                   <td>
//                     {projects.find((p) => p.id === b.project_id)?.name ||
//                       `ID: ${b.project_id}`}
//                   </td>
//                   <td>{b.title}</td>
//                   <td>{b.description}</td>
//                   <td>
//                     <span
//                       className={`badge ${
//                         b.severity === "high"
//                           ? "bg-danger"
//                           : b.severity === "medium"
//                           ? "bg-warning text-dark"
//                           : "bg-success"
//                       }`}
//                     >
//                       {b.severity}
//                     </span>
//                   </td>
//                   <td>{b.status}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center">
//                   No bugs reported yet.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default TesterDashboard;
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Badge,
  Button,
  Form,
} from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function TesterDashboard() {
  const [projects, setProjects] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [form, setForm] = useState({
    project_id: "",
    title: "",
    description: "",
    severity: "low",
  });

  const token = localStorage.getItem("token");

  // Fetch Projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  // Fetch Bugs
  const fetchBugs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/bugs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBugs(res.data);
    } catch (err) {
      console.error("Error fetching bugs:", err);
    }
  };

  // Report Bug
  const reportBug = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/bugs", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBugs();
      setForm({ project_id: "", title: "", description: "", severity: "low" });
    } catch (err) {
      console.error("Error reporting bug:", err);
      alert(err.response?.data?.message || "Error reporting bug");
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchBugs();
  }, []);

  // Stats
  const totalProjects = projects.length;
  const totalBugs = bugs.length;
  const highSeverity = bugs.filter((b) => b.severity === "high").length;
  const resolvedBugs = bugs.filter((b) => b.status === "resolved").length;
  const percentResolved =
    totalBugs > 0 ? Math.round((resolvedBugs / totalBugs) * 100) : 0;

  // Pie Chart Data
  const severityData = [
    { name: "Low", value: bugs.filter((b) => b.severity === "low").length },
    { name: "Medium", value: bugs.filter((b) => b.severity === "medium").length },
    { name: "High", value: highSeverity },
  ];
  const COLORS = ["#28a745", "#ffc107", "#dc3545"];

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #fcefee, #f8f9fa)",
        padding: "30px",
      }}
    >
      <div
        className="w-100"
        style={{
          maxWidth: "1200px",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          padding: "30px",
        }}
      >
        <h1 className="text-center fw-bold mb-4" style={{ color: "#6a4c93" }}>
          Tester Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-4">
            <Card className="shadow text-white" style={{ backgroundColor: "#cdb4db" }}>
              <Card.Body>
                <h6>Total Projects</h6>
                <h2>{totalProjects}</h2>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="shadow text-dark" style={{ backgroundColor: "#ffe5ec" }}>
              <Card.Body>
                <h6>Total Bugs Reported</h6>
                <h2>{totalBugs}</h2>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="shadow text-dark" style={{ backgroundColor: "#d8e2dc" }}>
              <Card.Body>
                <h6>High Severity Bugs</h6>
                <h2>{highSeverity}</h2>
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* Progress Bar */}
        <h5>Bug Resolution Progress</h5>
        <div className="progress mb-5" style={{ height: "25px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${percentResolved}%`,
              backgroundColor: "#cdb4db",
              fontWeight: "bold",
            }}
          >
            {percentResolved}% Resolved
          </div>
        </div>

        {/* Pie Chart */}
        <div className="row mb-5">
          <div className="col-md-12 d-flex justify-content-center">
            <div>
              <h6 className="text-center">Bug Severity Distribution</h6>
              <PieChart width={400} height={300}>
                <Pie
                  data={severityData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        </div>

        {/* Bug Report Form */}
        <Card className="shadow-lg mb-5">
          <Card.Body>
            <h5 className="card-title mb-3">Report a Bug</h5>
            <Form onSubmit={reportBug}>
              <Form.Group className="mb-3">
                <Form.Label>Select Project</Form.Label>
                <Form.Select
                  value={form.project_id}
                  onChange={(e) => setForm({ ...form, project_id: e.target.value })}
                  required
                >
                  <option value="">-- Select Project --</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Bug Title</Form.Label>
                <Form.Control
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Severity</Form.Label>
                <Form.Select
                  value={form.severity}
                  onChange={(e) => setForm({ ...form, severity: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Form.Select>
              </Form.Group>
              <Button
                type="submit"
                style={{ backgroundColor: "#cdb4db", border: "none" }}
                className="w-100 fw-bold"
              >
                Report Bug
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {/* Bugs Table */}
        <h4 className="mb-3">All Reported Bugs</h4>
        <div className="table-responsive">
          <table className="table table-striped table-hover shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Project</th>
                <th>Title</th>
                <th>Description</th>
                <th>Severity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bugs.length > 0 ? (
                bugs.map((b) => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>
                      {projects.find((p) => p.id === b.project_id)?.name ||
                        `ID: ${b.project_id}`}
                    </td>
                    <td>{b.title}</td>
                    <td>{b.description}</td>
                    <td>
                      <span
                        className={`badge ${
                          b.severity === "high"
                            ? "bg-danger"
                            : b.severity === "medium"
                            ? "bg-warning text-dark"
                            : "bg-success"
                        }`}
                      >
                        {b.severity}
                      </span>
                    </td>
                    <td>{b.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No bugs reported yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TesterDashboard;
