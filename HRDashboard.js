import React from "react";
import HRSidebar from "./HRSidebar"; // ✅ Import HR Sidebar
import "./styles.css"; 

function HRDashboard() {
  return (
    <div className="app-container">
      <HRSidebar />
      <div className="dashboard-content">
        <h2>HR Dashboard</h2>
        <p>Welcome to the HR Dashboard. Select an option from the sidebar.</p>
      </div>
    </div>
  );
}

export default HRDashboard;
