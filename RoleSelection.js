import React from "react";
import { useNavigate } from "react-router-dom";

function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="role-selection">
      <h2 className="role-heading" style={{ textAlign: "center" }}>Select Your Role</h2>
      <button onClick={() => navigate("/login/Admin")}>Login as Admin</button>
      <button onClick={() => navigate("/login/Intern")}>Login as Intern</button>
      <button onClick={() => navigate("/login/Supervisor")}>Login as Supervisor</button>
    </div>
  );
}

export default RoleSelection;
