import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Navbar from "./Navbar";
import AdminDashboard from "./AdminDashboard";
import InternDashboard from "./InternDashboard";
import HRSidebar from "./HRSidebar"; // ✅ Replace HRDashboard with HRSidebar
import MapInterns from "./MapInterns";
import MapInternsToSeniorDirector from "./MapInternsToSeniorDirector";
import Sidebar from "./AdminSidebar";
import InternSidebar from "./InternSidebar";
import RegisterInterns from "./RegisterInterns";
import FeedbackForm from "./FeedbackForm"; // ✅ Import FeedbackForm component
import "@fontsource/poppins";
import "./styles.css";
import AddCourses from "./AddCourses";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard (PMO & HR) */}
        <Route
          path="/admin-dashboard"
          element={
            <div className="app-container">
              <Sidebar />
              <AdminDashboard />
            </div>
          }
        />

        <Route
          path="/add-courses"
          element={
            <div className="app-container">
              <Sidebar />
              <AddCourses />
            </div>
          }
        />

        {/* HR Dashboard */}
        <Route
          path="/hr-dashboard"
          element={
            <div className="app-container">
              <HRSidebar /> {/* ✅ Use Sidebar instead of full HRDashboard */}
            </div>
          }
        />

        {/* Register Interns */}
        <Route
          path="/register-interns"
          element={
            <div className="app-container">
              <HRSidebar /> {/* ✅ Use Sidebar instead of HRDashboard */}
              <RegisterInterns />
            </div>
          }
        />

        {/* Intern Dashboard */}
        <Route
          path="/intern-dashboard"
          element={
            <div className="app-container">
              <InternSidebar />
              <InternDashboard />
            </div>
          }
        />

        {/* Feedback Form Route */}
        <Route
          path="/feedback-form"
          element={
            <div className="app-container">
              <InternSidebar /> {/* ✅ Keeping Sidebar for UI consistency */}
              <FeedbackForm />
            </div>
          }
        />

        {/* Map Interns (Admin Only) */}
        <Route
          path="/map-interns"
          element={
            <div className="app-container">
              <Sidebar />
              <MapInterns />
            </div>
          }
        />

        {/* Interns to Org - Map Interns to Senior Director */}
        <Route
          path="/interns-to-org"
          element={
            <div className="app-container">
              <HRSidebar /> {/* ✅ Use Sidebar instead of HRDashboard */}
              <MapInternsToSeniorDirector />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
