import React from "react";
import OrgChart from "./OrgChart";
import HRSidebar from "./HRSidebar";
import "./HRDashboard.css";

function HRDashboard() {
  return (
    <div className="hr-dashboard-container">
      <HRSidebar />
      <div className="hr-dashboard-content">
        <h2 className="dashboard-title">Welcome to HR Dashboard</h2>

        <div className="stat-tiles">
          <div className="tile">
            <h3>Total Interns</h3>
            <p>45</p>
          </div>
          <div className="tile">
            <h3>Directors</h3>
            <p>8</p>
          </div>
          <div className="tile">
            <h3>Open Slots</h3>
            <p>12</p>
          </div>
          <div className="tile">
            <h3>Recently Added</h3>
            <p>5</p>
          </div>
        </div>

        <div className="dashboard-sections">
          <div className="card">
            <h3>Register Intern</h3>
            <p>Use this form to register a new intern into the system.</p>
            <button className="dashboard-btn">Go to Register</button>
          </div>

          <div className="card">
            <h3>Intern Mapping</h3>
            <p>View and manage intern-to-director mappings.</p>
            <button className="dashboard-btn">Manage Mapping</button>
          </div>

          <div className="card">
            <h3>Recent Activities</h3>
            <ul className="activity-list">
              <li>Intern A assigned to Director X</li>
              <li>Intern B registered</li>
              <li>Slot opened under Director Y</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HRDashboard;
