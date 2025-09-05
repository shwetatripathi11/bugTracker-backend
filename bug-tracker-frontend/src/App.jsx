// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import AdminDashboard from "./pages/AdminDashboard";
// import TesterDashboard from "./pages/TesterDashboard";
// import DeveloperDashboard from "./pages/DeveloperDashboard";
// import Profile from "./pages/Profile";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/tester" element={<TesterDashboard />} />
//         <Route path="/developer" element={<DeveloperDashboard />} />
//         <Route path="/profile" element={<Profile />} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import TesterDashboard from "./pages/TesterDashboard";
import DeveloperDashboard from "./pages/DeveloperDashboard";
import Profile from "./pages/Profile";

function App() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <Router>
      {/* ✅ Navbar har page pe dikhana hai */}
      <Navbar onLogout={handleLogout} />

      {/* ✅ Page routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/tester" element={<TesterDashboard />} />
        <Route path="/developer" element={<DeveloperDashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;

