import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./Sidebar.css"; // ✅ Uses Sidebar.css for consistency

const HRSidebar = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <aside className="sidebar">
      {/* HR Dashboard Link */}
      <Link to="/hr-dashboard" className="sidebar-item">
        HR Dashboard
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
          <Link to="/interns-to-org" className="submenu-item">
            Interns to Org
          </Link>
        </div>
      )}
    </aside>
  );
};

export default HRSidebar;
