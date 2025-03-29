import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import "./Sidebar.css";

const AdminSidebar = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <aside className="sidebar">
      {/* Dashboard Link */}
      <Link to="/admin-dashboard" className="sidebar-item">
        Dashboard
      </Link>

      {/* Intern Management Section */}
      <div className="sidebar-item" onClick={() => toggleSection("internManagement")}>
        Intern Management {openSection === "internManagement" ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {openSection === "internManagement" && (
        <div className="submenu">
          <Link to="/register-interns" className="submenu-item">
            Register Interns
          </Link>
          <Link to="/map-interns" className="submenu-item">
            Map Interns
          </Link>
          <Link to="/manage-gamify-teams" className="submenu-item">
            Manage Gamify Teams
          </Link>
        </div>
      )}

      {/* Courses Section */}
      <div className="sidebar-item" onClick={() => toggleSection("courses")}>
        Courses {openSection === "courses" ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {openSection === "courses" && (
        <div className="submenu">
          <Link to="/add-courses" className="submenu-item">
            Add Courses
          </Link>
          <Link to="/track-courses" className="submenu-item">
            Track Courses
          </Link>
        </div>
      )}

      {/* Events & Meetings Section */}
      <div className="sidebar-item" onClick={() => toggleSection("eventsMeetings")}>
        Events & Meetings {openSection === "eventsMeetings" ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {openSection === "eventsMeetings" && (
        <div className="submenu">
          <Link to="/schedule-meeting" className="submenu-item">
            Schedule a Meeting
          </Link>
          <Link to="/view-meetings" className="submenu-item">
            View Meetings
          </Link>
          <Link to="/calendar" className="submenu-item">
            Calendar
          </Link>
        </div>
      )}

      {/* In-App Messaging */}
      <div className="sidebar-item" onClick={() => toggleSection("messaging")}>
        In-App Messaging {openSection === "messaging" ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {openSection === "messaging" && (
        <div className="submenu">
          <Link to="/group-chat" className="submenu-item">
            Intern Group Chat
          </Link>
          <Link to="/announcements" className="submenu-item">
            Post Announcements
          </Link>
        </div>
      )}

      {/* Query Forum */}
      <Link to="/query-forum" className="sidebar-item">
        Query Forum
      </Link>
    </aside>
  );
};

export default AdminSidebar;
