import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CredentialData from "./CredentialData"; // ✅ Import credentials
import "./styles.css"; 

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Find matching user credentials
    const user = CredentialData.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      alert(`Login successful as ${user.role}`);

      // Redirect based on role
      if (user.role === "HR") {
        navigate("/hr-dashboard"); // ✅ HR → HR Dashboard
      } else if (user.role === "PMO") {
        navigate("/admin-dashboard"); // ✅ PMO → Admin Dashboard
      } else if (user.role === "Intern") {
        navigate("/intern-dashboard"); // ✅ Interns → Intern Dashboard
      } else {
        setError("Unauthorized Role!"); // Handle unexpected roles
      }
    } else {
      setError("Invalid Username or Password!"); // If no match found
    }
  };

  return (
    <div className="role-selection">
      <h2>Login</h2> {/* Generic heading */}
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <button className="back-btn" type="button" onClick={() => navigate("/")}>
          Go Back
        </button>
      </form>
    </div>
  );
}

export default Login;
