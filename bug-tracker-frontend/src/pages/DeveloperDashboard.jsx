// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function DeveloperDashboard() {
//   const [bugs, setBugs] = useState([]);
//   const token = localStorage.getItem("token");

//   // ✅ Fetch all bugs (in real app: sirf assigned bugs)
//   const fetchBugs = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/bugs", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setBugs(res.data);
//     } catch (err) {
//       alert("Error fetching bugs");
//     }
//   };

//   // ✅ Update bug status
//   const updateStatus = async (id, status) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/bugs/${id}/status`,
//         { status },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchBugs(); // refresh list after update
//     } catch (err) {
//       alert(err.response?.data?.message || "Error updating status");
//     }
//   };

//   useEffect(() => { fetchBugs(); }, []);

//   return (
//     <div>
//       <h2>Developer Dashboard</h2>
//       <h3>Assigned Bugs</h3>
//       <ul>
//         {bugs.map(b => (
//           <li key={b.id}>
//             <strong>{b.title}</strong> - {b.description} 
//             [Severity: {b.severity}] - Status: {b.status}
//             <div>
//               <button onClick={() => updateStatus(b.id, "in_progress")}>In Progress</button>
//               <button onClick={() => updateStatus(b.id, "resolved")}>Resolve</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default DeveloperDashboard;
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Badge,
  Button,
} from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function DeveloperDashboard() {
  const [bugs, setBugs] = useState([]);
  const token = localStorage.getItem("token");

  // ✅ Fetch Bugs
  const fetchBugs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/bugs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBugs(res.data);
    } catch (err) {
      alert("Error fetching bugs");
    }
  };

  // ✅ Update Bug Status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/bugs/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBugs();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating status");
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  // 🔹 Stats
  const totalBugs = bugs.length;
  const inProgress = bugs.filter((b) => b.status === "in_progress").length;
  const resolved = bugs.filter((b) => b.status === "resolved").length;
  const percentResolved =
    totalBugs > 0 ? Math.round((resolved / totalBugs) * 100) : 0;

  // 🔹 Chart Data
  const statusData = [
    { name: "Open", value: bugs.filter((b) => b.status === "open").length },
    { name: "In Progress", value: inProgress },
    { name: "Resolved", value: resolved },
  ];

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
          Developer Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-4">
            <Card className="shadow text-white" style={{ backgroundColor: "#cdb4db" }}>
              <Card.Body>
                <h6>Total Bugs</h6>
                <h2>{totalBugs}</h2>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="shadow text-dark" style={{ backgroundColor: "#ffe5ec" }}>
              <Card.Body>
                <h6>In Progress</h6>
                <h2>{inProgress}</h2>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="shadow text-dark" style={{ backgroundColor: "#d8e2dc" }}>
              <Card.Body>
                <h6>Resolved</h6>
                <h2>{resolved}</h2>
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* Progress Bar */}
        <h5>Resolution Progress</h5>
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

        {/* Chart */}
        <div className="row mb-5">
          <div className="col-md-12 d-flex justify-content-center">
            <div>
              <h6 className="text-center">Bug Status Overview</h6>
              <BarChart width={600} height={300} data={statusData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#cdb4db" />
              </BarChart>
            </div>
          </div>
        </div>

        {/* Bugs Table */}
        <h3 className="mb-4">Assigned Bugs</h3>
        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Project</th>
                <th>Title</th>
                <th>Description</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bugs.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.project_id}</td>
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
                  <td>
                    <Button
                      size="sm"
                      style={{ backgroundColor: "#ffc107", border: "none" }}
                      className="me-2 text-dark"
                      onClick={() => updateStatus(b.id, "in_progress")}
                    >
                      In Progress
                    </Button>
                    <Button
                      size="sm"
                      style={{ backgroundColor: "#cdb4db", border: "none" }}
                      onClick={() => updateStatus(b.id, "resolved")}
                    >
                      Resolve
                    </Button>
                  </td>
                </tr>
              ))}
              {bugs.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">
                    No bugs assigned yet.
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

export default DeveloperDashboard;

