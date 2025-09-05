// import React, { useState } from "react";
// import axios from "axios";

// function Register() {
//   const [form, setForm] = useState({ name: "", email: "", password: "", role: "tester" });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/auth/register", form);
//       alert(res.data.message);
//       window.location = "/";
//     } catch (err) {
//       alert(err.response?.data?.message || "Error");
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center vh-100">
//       <div className="card shadow-lg p-4 animate__animated animate__fadeInUp" style={{ width: "400px" }}>
//         <h3 className="text-center mb-3">Register</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label>Name</label>
//             <input 
//               type="text" 
//               className="form-control"
//               onChange={(e) => setForm({ ...form, name: e.target.value })} 
//             />
//           </div>
//           <div className="mb-3">
//             <label>Email</label>
//             <input 
//               type="email" 
//               className="form-control"
//               onChange={(e) => setForm({ ...form, email: e.target.value })} 
//             />
//           </div>
//           <div className="mb-3">
//             <label>Password</label>
//             <input 
//               type="password" 
//               className="form-control"
//               onChange={(e) => setForm({ ...form, password: e.target.value })} 
//             />
//           </div>
//           <div className="mb-3">
//             <label>Role</label>
//             <select className="form-select" onChange={(e) => setForm({ ...form, role: e.target.value })}>
//               <option value="admin">Admin</option>
//               <option value="tester">Tester</option>
//               <option value="developer">Developer</option>
//             </select>
//           </div>
//           <button className="btn btn-success w-100">Register</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Register;
import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "tester",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/register", form);
      alert(res.data.message);
      window.location = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #fcefee, #f8f9fa)",
      }}
    >
      <div
        className="card shadow-lg p-5 border-0 animate__animated animate__fadeInUp"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
        }}
      >
        <h2
          className="text-center mb-3 fw-bold"
          style={{ color: "#6a4c93", fontFamily: "Poppins, sans-serif" }}
        >
          Create Account
        </h2>
        <p className="text-center text-muted mb-4">
          Join Bug Tracker by filling the details below
        </p>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ borderRadius: "10px", border: "1px solid #ddd" }}
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{ borderRadius: "10px", border: "1px solid #ddd" }}
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={{ borderRadius: "10px", border: "1px solid #ddd" }}
              placeholder="Enter your password"
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Role</label>
            <select
              className="form-select form-select-lg"
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              style={{ borderRadius: "10px", border: "1px solid #ddd" }}
              value={form.role}
            >
              <option value="admin">Admin</option>
              <option value="tester">Tester</option>
              <option value="developer">Developer</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-100 py-2 fw-bold"
            style={{
              backgroundColor: "#cdb4db",
              border: "none",
              borderRadius: "10px",
              fontSize: "1.1rem",
              color: "#fff",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#b5838d")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#cdb4db")}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
