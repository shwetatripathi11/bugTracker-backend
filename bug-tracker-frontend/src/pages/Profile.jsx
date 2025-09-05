// import React from "react";
import { jwtDecode } from "jwt-decode";
import { Button, Card } from "react-bootstrap";

function Profile() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location = "/";
    return null;
  }

  const decoded = jwtDecode(token);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
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
      <Card
        className="shadow-lg p-5 border-0 animate__animated animate__fadeInUp"
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
        }}
      >
        <h2
          className="text-center mb-4 fw-bold"
          style={{ color: "#6a4c93", fontFamily: "Poppins, sans-serif" }}
        >
          My Profile
        </h2>

        <ul className="list-group list-group-flush mb-4">
          <li className="list-group-item">
            <strong>ID:</strong> {decoded.id}
          </li>
          <li className="list-group-item">
            <strong>Name:</strong> {decoded.name || "N/A"}
          </li>
          <li className="list-group-item">
            <strong>Email:</strong> {decoded.email || "N/A"}
          </li>
          <li className="list-group-item">
            <strong>Role:</strong>{" "}
            <span
              className={`badge ${
                decoded.role === "admin"
                  ? "bg-danger"
                  : decoded.role === "tester"
                  ? "bg-info text-dark"
                  : "bg-success"
              }`}
            >
              {decoded.role}
            </span>
          </li>
        </ul>

        <Button
          onClick={handleLogout}
          className="w-100 fw-bold"
          style={{
            backgroundColor: "#cdb4db",
            border: "none",
            borderRadius: "10px",
            fontSize: "1.1rem",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#b5838d")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#cdb4db")}
        >
          Logout
        </Button>
      </Card>
    </div>
  );
}

export default Profile;
