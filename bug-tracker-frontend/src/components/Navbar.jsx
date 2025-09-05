import React from "react";

function Navbar({ onLogout }) {
  const token = localStorage.getItem("token");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 shadow">
      <a className="navbar-brand fw-bold" href="/">🐞 Bug Tracker</a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {token ? (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/profile">Profile</a>
              </li>
              <li className="nav-item">
                <button 
                  onClick={onLogout} 
                  className="btn btn-danger btn-sm ms-2">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">Register</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
