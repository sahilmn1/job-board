import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./Navbar";
import EmployerDashboard from "./components/EmployerDashboard";
import CandidateDashboard from "./components/CandidateDashboard";
import Login from "./components/LoginFrom";
import Signup from "./components/RegistrationForm";
import Home from "./components/HomePage";
import JobList from "./components/JobListingsPage";
import JobDetailPage from "./components/JobDetailPage";
import JobForm from "./components/JobForm";
import EmployerJobApplications from "./components/EmployerJobApplications";

const App = () => {
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || ""
  );
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const handleLogout = () => {
    setUserRole("");
    setName("");
    localStorage.removeItem("userRole");
  };

  const handleLogin = (role, profileName, userId) => {
    setUserRole(role);
    setId(userId);
    localStorage.setItem("userRole", role);

    // Split the string using '@'
    const parts = profileName.split("@");

    // Take the first part before '@' as the name
    const namePart = parts[0];

    // Set the extracted name as the state
    setName(namePart);
  };

  return (
    <Router>
      <Navbar userRole={userRole} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/dashboard"
          element={
            userRole === "employer" ? (
              <EmployerDashboard employerId={id} />
            ) : userRole === "candidate" ? (
              <CandidateDashboard name={name} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/job-posting" element={<JobForm employerId={id} />} />
        <Route
          path="/employer-dashboard/:employerId/:jobId/applications"
          element={<EmployerJobApplications />}
        />
      </Routes>
    </Router>
  );
};

export default App;
