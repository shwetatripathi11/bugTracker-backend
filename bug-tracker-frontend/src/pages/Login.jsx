// import React, { useState } from "react";
// import axios from "axios";

// function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // ✅ Send login request
//       const res = await axios.post("http://localhost:5000/auth/login", form);

//       // ✅ Save token in localStorage
//       localStorage.setItem("token", res.data.token);

//       alert("Login successful");

//       // ✅ Decode token payload to get role
//       const payload = JSON.parse(atob(res.data.token.split(".")[1]));

//       // ✅ Redirect based on role
//       if (payload.role === "admin") {
//         window.location = "/admin";
//       } else if (payload.role === "tester") {
//         window.location = "/tester";
//       } else if (payload.role === "developer") {
//         window.location = "/developer";
//       } else {
//         window.location = "/"; // fallback
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   //css part
//   return (
//   <div
//     className="d-flex justify-content-center align-items-center vh-100"
//     style={{ backgroundColor: "#f8f9fa" }} // light grey background
//   >
//     <div
//       className="card shadow-lg p-5 border-0"
//       style={{
//         width: "100%",
//         maxWidth: "420px",
//         borderRadius: "15px",
//         backgroundColor: "#ffffff",
//       }}
//     >
//       <h3 className="text-center mb-4 fw-bold" style={{ color: "#6a4c93" }}>
//         Login
//       </h3>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label fw-semibold">Email</label>
//           <input
//             type="email"
//             className="form-control form-control-lg"
//             required
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             style={{ borderRadius: "10px" }}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="form-label fw-semibold">Password</label>
//           <input
//             type="password"
//             className="form-control form-control-lg"
//             required
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             style={{ borderRadius: "10px" }}
//           />
//         </div>
//         <button
//           className="btn w-100 py-2 fw-bold"
//           style={{
//             backgroundColor: "#cdb4db",
//             border: "none",
//             borderRadius: "10px",
//             fontSize: "1.1rem",
//             color: "#fff",
//             transition: "all 0.3s ease",
//           }}
//           onMouseOver={(e) => (e.target.style.backgroundColor = "#b5838d")}
//           onMouseOut={(e) => (e.target.style.backgroundColor = "#cdb4db")}
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   </div>
// );


//   }

// export default Login;
import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", form);
      localStorage.setItem("token", res.data.token);

      alert("Login successful");
      const payload = JSON.parse(atob(res.data.token.split(".")[1]));

      if (payload.role === "admin") {
        window.location = "/admin";
      } else if (payload.role === "tester") {
        window.location = "/tester";
      } else if (payload.role === "developer") {
        window.location = "/developer";
      } else {
        window.location = "/";
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",   // full height
        width: "100vw",    // full width
        background: "linear-gradient(135deg, #fcefee, #f8f9fa)",
      }}
    >
      <div
        className="card shadow-lg p-5 border-0"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
        }}
      >
        <h2
          className="text-center mb-4 fw-bold"
          style={{ color: "#6a4c93", fontFamily: "Poppins, sans-serif" }}
        >
          Welcome Back
        </h2>
        <p className="text-center text-muted mb-4">
          Please login to continue to Bug Tracker
        </p>

        <form onSubmit={handleSubmit}>
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
          <div className="mb-4">
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

