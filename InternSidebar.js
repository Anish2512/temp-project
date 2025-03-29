import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./Sidebar.css";  // Ensure correct import

const InternSidebar = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <aside className="sidebar">
      {/* Dashboard */}
      <Link to="/intern-dashboard" className="sidebar-item">
        Dashboard
      </Link>

      {/* Profile */}
      <Link to="/edit-profile" className="sidebar-item">
        Edit Profile
      </Link>

      {/* Assigned Tasks */}
      <div className="sidebar-item" onClick={() => toggleSection("tasks")}>
        Assigned Tasks {openSection === "tasks" ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {openSection === "tasks" && (
        <div className="submenu">
          <Link to="/assigned-tasks" className="submenu-item">
            View Tasks
          </Link>
        </div>
      )}

      {/* Assigned Courses */}
      <div className="sidebar-item" onClick={() => toggleSection("courses")}>
        Assigned Courses {openSection === "courses" ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {openSection === "courses" && (
        <div className="submenu">
          <Link to="/training-modules" className="submenu-item">
            Training Modules
          </Link>
          <Link to="/kt-sessions" className="submenu-item">
            KT Sessions
          </Link>
          <Link to="/pdfs" className="submenu-item">
            PDFs
          </Link>
          <Link to="/ppts" className="submenu-item link-style">
            PPTs
          </Link>
        </div>
      )}

      {/* Meetings */}
      <div className="sidebar-item" onClick={() => toggleSection("meetings")}>
        Meetings {openSection === "meetings" ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {openSection === "meetings" && (
        <div className="submenu">
          <Link to="/scheduled-meetings" className="submenu-item">
            Scheduled Meetings
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
            Announcements
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

export default InternSidebar;