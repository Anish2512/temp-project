import React from "react";
import { Link } from "react-router-dom";
import "./styles.css"; // Import styles

function Navbar() {
  return (
    <nav className="navbar">
      <img src="/verizon-logo.png" alt="Verizon Logo" className="logo" />
      <div className="nav-links">
        <Link to="/">Home</Link>
        {/* <Link to="/login">Login</Link> */}
      </div>
    </nav>
  );
}

export default Navbar;
