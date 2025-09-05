// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Modal, Button, Form, Table, Badge } from "react-bootstrap";
// import {
//   PieChart, Pie, Cell, Tooltip, Legend,
//   BarChart, Bar, XAxis, YAxis,
// } from "recharts";

// function AdminDashboard() {
//   const [projects, setProjects] = useState([]);
//   const [bugs, setBugs] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [form, setForm] = useState({ name: "", description: "" });
//   const [showModal, setShowModal] = useState(false);

//   const token = localStorage.getItem("token");

//   // ✅ Fetch Projects
//   const fetchProjects = async () => {
//     const res = await axios.get("http://localhost:5000/projects", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setProjects(res.data);
//   };

//   // ✅ Fetch Bugs
//   const fetchBugs = async () => {
//     const res = await axios.get("http://localhost:5000/bugs", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setBugs(res.data);
//   };

//   // ✅ Fetch Users (excluding admin)
//   const fetchUsers = async () => {
//     const res = await axios.get("http://localhost:5000/users", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setUsers(res.data.filter((u) => u.role !== "admin"));
//   };

//   // ✅ Create Project
//   const createProject = async (e) => {
//     e.preventDefault();
//     await axios.post("http://localhost:5000/projects", form, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     fetchProjects();
//     setForm({ name: "", description: "" });
//     setShowModal(false);
//   };

//   // ✅ Delete Project
//   const deleteProject = async (id) => {
//     await axios.delete(`http://localhost:5000/projects/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     fetchProjects();
//   };

//   // ✅ Delete Bug
//   const deleteBug = async (id) => {
//     await axios.delete(`http://localhost:5000/bugs/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     fetchBugs();
//   };

//   // ✅ Delete User
//   const deleteUser = async (id) => {
//     await axios.delete(`http://localhost:5000/users/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     fetchUsers();
//   };

//   useEffect(() => {
//     fetchProjects();
//     fetchBugs();
//     fetchUsers();
//   }, []);

//   // 🔹 Summary Stats
//   const totalProjects = projects.length;
//   const totalBugs = bugs.length;
//   const openBugs = bugs.filter((b) => b.status === "open").length;
//   const resolvedBugs = bugs.filter((b) => b.status === "resolved").length;

//   // 🔹 Pie Chart Data (Bug Severity)
//   const severityData = [
//     { name: "Low", value: bugs.filter((b) => b.severity === "low").length },
//     { name: "Medium", value: bugs.filter((b) => b.severity === "medium").length },
//     { name: "High", value: bugs.filter((b) => b.severity === "high").length },
//   ];
//   const COLORS = ["#28a745", "#ffc107", "#dc3545"];

//   // 🔹 Bar Chart Data (Project vs Bug count)
//   const projectBugData = projects.map((p) => ({
//     name: p.name,
//     bugs: bugs.filter((b) => b.project_id === p.id).length,
//   }));

//   // 🔹 Progress Bar (Resolved %)
//   const percentResolved = totalBugs > 0 ? Math.round((resolvedBugs / totalBugs) * 100) : 0;

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center fw-bold mb-4">Admin Dashboard</h1>

//       {/* ✅ Summary Cards */}
//       <div className="row mb-4">
//         <div className="col-md-3">
//           <div className="card text-white bg-primary shadow">
//             <div className="card-body">
//               <h5>Total Projects</h5>
//               <h2>{totalProjects}</h2>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-3">
//           <div className="card text-white bg-danger shadow">
//             <div className="card-body">
//               <h5>Total Bugs</h5>
//               <h2>{totalBugs}</h2>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-3">
//           <div className="card text-white bg-warning shadow">
//             <div className="card-body">
//               <h5>Open Bugs</h5>
//               <h2>{openBugs}</h2>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-3">
//           <div className="card text-white bg-success shadow">
//             <div className="card-body">
//               <h5>Resolved Bugs</h5>
//               <h2>{resolvedBugs}</h2>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Progress Bar */}
//       <h5>Bug Resolution Progress</h5>
//       <div className="progress mb-4">
//         <div
//           className="progress-bar bg-success"
//           role="progressbar"
//           style={{ width: `${percentResolved}%` }}
//         >
//           {percentResolved}% Resolved
//         </div>
//       </div>

//       {/* ✅ Charts */}
//       <div className="row mb-5">
//         <div className="col-md-6">
//           <h5 className="text-center">Bug Severity Distribution</h5>
//           <PieChart width={400} height={300}>
//             <Pie
//               data={severityData}
//               dataKey="value"
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               label
//             >
//               {severityData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </div>
//         <div className="col-md-6">
//           <h5 className="text-center">Projects vs Bugs</h5>
//           <BarChart width={500} height={300} data={projectBugData}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="bugs" fill="#007bff" />
//           </BarChart>
//         </div>
//       </div>

//       {/* ✅ Create Project Button */}
//       <div className="d-flex justify-content-end mb-3">
//         <Button variant="primary" onClick={() => setShowModal(true)}>
//           + Create Project
//         </Button>
//       </div>

//       {/* Modal for Project */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>New Project</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={createProject}>
//             <Form.Group className="mb-3">
//               <Form.Label>Project Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 value={form.description}
//                 onChange={(e) =>
//                   setForm({ ...form, description: e.target.value })
//                 }
//                 required
//               />
//             </Form.Group>
//             <div className="d-flex justify-content-between">
//               <Button variant="secondary" onClick={() => setShowModal(false)}>
//                 Cancel
//               </Button>
//               <Button type="submit" variant="success">
//                 Create
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* Projects Table */}
//       <h3 className="mt-4">Projects</h3>
//       <div className="row">
//         {projects.map((p) => (
//           <div className="col-md-4 mb-3" key={p.id}>
//             <div className="card shadow h-100">
//               <div className="card-body">
//                 <h5 className="card-title">{p.name}</h5>
//                 <p className="card-text">{p.description}</p>
//                 <Button
//                   size="sm"
//                   variant="danger"
//                   onClick={() => deleteProject(p.id)}
//                 >
//                   Delete Project
//                 </Button>
//               </div>
//             </div>
//           </div>
//         ))}
//         {projects.length === 0 && <p>No projects yet.</p>}
//       </div>

//       {/* Bugs Table */}
//       <h3 className="mt-5">Bugs</h3>
//       <Table striped hover bordered>
//         <thead className="table-dark">
//           <tr>
//             <th>ID</th>
//             <th>Project</th>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Severity</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bugs.map((b) => (
//             <tr key={b.id}>
//               <td>{b.id}</td>
//               <td>{b.project_id}</td>
//               <td>{b.title}</td>
//               <td>{b.description}</td>
//               <td>
//                 <Badge
//                   bg={
//                     b.severity === "high"
//                       ? "danger"
//                       : b.severity === "medium"
//                       ? "warning"
//                       : "success"
//                   }
//                 >
//                   {b.severity}
//                 </Badge>
//               </td>
//               <td>{b.status}</td>
//               <td>
//                 <Button
//                   size="sm"
//                   variant="danger"
//                   onClick={() => deleteBug(b.id)}
//                 >
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//           {bugs.length === 0 && (
//             <tr>
//               <td colSpan="7" className="text-center">
//                 No bugs
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>

//       {/* Users Table */}
//       <h3 className="mt-5">Users (Testers & Developers)</h3>
//       <Table striped hover bordered>
//         <thead className="table-dark">
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => (
//             <tr key={u.id}>
//               <td>{u.id}</td>
//               <td>{u.name}</td>
//               <td>{u.email}</td>
//               <td>{u.role}</td>
//               <td>
//                 <Button
//                   size="sm"
//                   variant="danger"
//                   onClick={() => deleteUser(u.id)}
//                 >
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//           {users.length === 0 && (
//             <tr>
//               <td colSpan="5" className="text-center">
//                 No users
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// export default AdminDashboard;
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  Button,
  Form,
  Modal,
  Badge,
  Card,
} from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch Data
  const fetchProjects = async () => {
    const res = await axios.get("http://localhost:5000/projects", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProjects(res.data);
  };

  const fetchBugs = async () => {
    const res = await axios.get("http://localhost:5000/bugs", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBugs(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(res.data.filter((u) => u.role !== "admin"));
  };

  useEffect(() => {
    fetchProjects();
    fetchBugs();
    fetchUsers();
  }, []);

  // Create Project
  const createProject = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/projects", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProjects();
    setForm({ name: "", description: "" });
    setShowModal(false);
  };

  const deleteProject = async (id) => {
    await axios.delete(`http://localhost:5000/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProjects();
  };

  const deleteBug = async (id) => {
    await axios.delete(`http://localhost:5000/bugs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBugs();
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  };

  // Stats
  const totalProjects = projects.length;
  const totalBugs = bugs.length;
  const openBugs = bugs.filter((b) => b.status === "open").length;
  const resolvedBugs = bugs.filter((b) => b.status === "resolved").length;

  const severityData = [
    { name: "Low", value: bugs.filter((b) => b.severity === "low").length },
    { name: "Medium", value: bugs.filter((b) => b.severity === "medium").length },
    { name: "High", value: bugs.filter((b) => b.severity === "high").length },
  ];
  const COLORS = ["#28a745", "#ffc107", "#dc3545"];

  const projectBugData = projects.map((p) => ({
    name: p.name,
    bugs: bugs.filter((b) => b.project_id === p.id).length,
  }));

  const percentResolved =
    totalBugs > 0 ? Math.round((resolvedBugs / totalBugs) * 100) : 0;

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
          Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-3">
            <Card className="shadow text-white" style={{ backgroundColor: "#cdb4db" }}>
              <Card.Body>
                <h6>Total Projects</h6>
                <h2>{totalProjects}</h2>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="shadow text-white" style={{ backgroundColor: "#cdb4db" }}>
              <Card.Body>
                <h6>Total Bugs</h6>
                <h2>{totalBugs}</h2>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="shadow text-dark" style={{ backgroundColor: "#ffe5ec" }}>
              <Card.Body>
                <h6>Open Bugs</h6>
                <h2>{openBugs}</h2>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="shadow text-dark" style={{ backgroundColor: "#d8e2dc" }}>
              <Card.Body>
                <h6>Resolved Bugs</h6>
                <h2>{resolvedBugs}</h2>
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* Progress */}
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

        {/* Charts */}
        <div className="row mb-5">
          <div className="col-md-6 d-flex justify-content-center">
            <div>
              <h6 className="text-center">Bug Severity Distribution</h6>
              <PieChart width={350} height={250}>
                <Pie data={severityData} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <div>
              <h6 className="text-center">Projects vs Bugs</h6>
              <BarChart width={400} height={250} data={projectBugData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bugs" fill="#cdb4db" />
              </BarChart>
            </div>
          </div>
        </div>

        {/* Accordion Sections */}
        <Accordion defaultActiveKey="0" flush>
          {/* Projects */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>Projects</Accordion.Header>
            <Accordion.Body>
              <div className="row">
                {projects.map((p) => (
                  <div className="col-md-4 mb-3" key={p.id}>
                    <Card className="shadow h-100">
                      <Card.Body>
                        <Card.Title>{p.name}</Card.Title>
                        <Card.Text>{p.description}</Card.Text>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => deleteProject(p.id)}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
                {projects.length === 0 && <p>No projects yet.</p>}
              </div>
              <div className="d-flex justify-content-end">
                <Button
                  style={{ backgroundColor: "#cdb4db", border: "none" }}
                  onClick={() => setShowModal(true)}
                >
                  + Create Project
                </Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          {/* Bugs */}
          <Accordion.Item eventKey="1">
            <Accordion.Header>Bugs</Accordion.Header>
            <Accordion.Body>
              <div className="row">
                {bugs.map((b) => (
                  <div className="col-md-4 mb-3" key={b.id}>
                    <Card className="shadow h-100">
                      <Card.Body>
                        <Card.Title>{b.title}</Card.Title>
                        <Card.Text>
                          <strong>Severity:</strong>{" "}
                          <Badge
                            bg={
                              b.severity === "high"
                                ? "danger"
                                : b.severity === "medium"
                                ? "warning"
                                : "success"
                            }
                          >
                            {b.severity}
                          </Badge>
                          <br />
                          <strong>Status:</strong> {b.status}
                          <br />
                          <small>{b.description}</small>
                        </Card.Text>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => deleteBug(b.id)}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
                {bugs.length === 0 && <p>No bugs yet.</p>}
              </div>
            </Accordion.Body>
          </Accordion.Item>

          {/* Users */}
          <Accordion.Item eventKey="2">
            <Accordion.Header>Users</Accordion.Header>
            <Accordion.Body>
              <div className="row">
                {users.map((u) => (
                  <div className="col-md-4 mb-3" key={u.id}>
                    <Card className="shadow h-100">
                      <Card.Body>
                        <Card.Title>{u.name}</Card.Title>
                        <Card.Text>
                          <strong>Email:</strong> {u.email} <br />
                          <strong>Role:</strong>{" "}
                          <Badge bg="info" text="dark">
                            {u.role}
                          </Badge>
                        </Card.Text>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => deleteUser(u.id)}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
                {users.length === 0 && <p>No users found.</p>}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* Modal for Create Project */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Create New Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={createProject}>
              <Form.Group className="mb-3">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  style={{ backgroundColor: "#cdb4db", border: "none" }}
                  className="ms-2"
                >
                  Create
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default AdminDashboard;



