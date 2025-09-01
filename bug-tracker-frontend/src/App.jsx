import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import TesterDashboard from "./pages/TesterDashboard";
import DeveloperDashboard from "./pages/DeveloperDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/tester" element={<TesterDashboard />} />
        <Route path="/developer" element={<DeveloperDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
