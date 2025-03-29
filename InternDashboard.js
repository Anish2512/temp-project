import React from "react";
import InternSidebar from "./InternSidebar";
import "./InternDashboard.css";

const InternDashboard = () => {
  return (
    <div className="intern-dashboard">
      <InternSidebar />
      <div className="intern-content">
        <h2>Welcome to Intern Dashboard</h2>
        <p>Select an option from the sidebar.</p>
      </div>
    </div>
  );
};

export default InternDashboard;
