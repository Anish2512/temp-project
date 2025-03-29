import React from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      

      {/* Full-Width Container */}
      <div className="dashboard-container">
        {/* Left Section */}
        <div className="left-section">
          <section className="overview">
            <div className="stat-box">Total Interns <span>120</span></div>
            <div className="stat-box">Ongoing Projects <span>15</span></div>
            <div className="stat-box">Pending Approvals <span>8</span></div>
          </section>

          <section className="intern-management">
            <h2>Intern Management</h2>
            <button>Register Interns</button>
            <button>Map Interns to Teams</button>
            <button>View & Manage Interns</button>
          </section>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <section className="hr-operations">
            <h2>HR Operations</h2>
            <button>Approve Leave Requests</button>
            <button>Payroll & Stipend Processing</button>
          </section>

          <section className="events-meetings">
            <h2>Events & Meetings</h2>
            <button>Schedule a Meeting</button>
            <button>View Meetings</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
