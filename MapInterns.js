import React, { useState } from "react";
import Sidebar from "./AdminSidebar"; // Import Sidebar
import { data } from "./data";
import "./MapInterns.css"; // Ensure this file exists for styling

const MapInterns = () => {
    const [selectedIntern, setSelectedIntern] = useState(null);
    const [selectedDirector, setSelectedDirector] = useState(null);
    const [selectedSupervisor, setSelectedSupervisor] = useState(null);
    const [selectedSME, setSelectedSME] = useState(""); // Optional
    const [selectedBuddy, setSelectedBuddy] = useState(null);
    const [isMapped, setIsMapped] = useState(false);
  
    // Handle selecting an intern
    const handleInternSelect = (event) => {
      const internId = parseInt(event.target.value);
      const intern = data.interns.find((i) => i.id === internId);
      setSelectedIntern(intern);
      setSelectedDirector(null);
      setSelectedSupervisor(null);
      setSelectedBuddy(null);
      setSelectedSME("");
      setIsMapped(false);
    };
  
    // Handle selecting a director
    const handleDirectorSelect = (event) => {
      const directorId = parseInt(event.target.value);
      const director = data.directors.find((d) => d.id === directorId);
      setSelectedDirector(director);
      setSelectedSupervisor(null);
      setSelectedBuddy(null);
      setSelectedSME("");
    };
  
    // Handle selecting a supervisor
    const handleSupervisorSelect = (event) => {
      const supervisorId = parseInt(event.target.value);
      const supervisor = selectedDirector?.supervisors.find(
        (s) => s.id === supervisorId
      );
      setSelectedSupervisor(supervisor);
      setSelectedBuddy(null);
    };
  
    // Handle mapping interns
    const handleMapping = () => {
      if (!selectedIntern || !selectedDirector || !selectedSupervisor) {
        alert("Please select all required fields before mapping.");
        return;
      }
      setIsMapped(true);
    };
  
    return (
      <div className="map-interns-container">
        <h2>Map Interns</h2>
  
        {/* Intern Selection */}
        <div className="dropdown">
          <label>Select Intern:</label>
          <select onChange={handleInternSelect} value={selectedIntern?.id || ""}>
            <option value="">-- Select Intern --</option>
            {data.interns.map((intern) => (
              <option key={intern.id} value={intern.id}>
                {intern.name}
              </option>
            ))}
          </select>
        </div>
  
        {/* Director Selection */}
        {selectedIntern && (
          <div className="dropdown">
            <label>Select Director:</label>
            <select onChange={handleDirectorSelect} value={selectedDirector?.id || ""}>
              <option value="">-- Select Director --</option>
              {data.directors.map((director) => (
                <option key={director.id} value={director.id}>
                  {director.name}
                </option>
              ))}
            </select>
          </div>
        )}
  
        {/* Supervisor Selection */}
        {selectedDirector && (
          <div className="dropdown">
            <label>Select Supervisor:</label>
            <select onChange={handleSupervisorSelect} value={selectedSupervisor?.id || ""}>
              <option value="">-- Select Supervisor --</option>
              {selectedDirector.supervisors.map((supervisor) => (
                <option key={supervisor.id} value={supervisor.id}>
                  {supervisor.name}
                </option>
              ))}
            </select>
          </div>
        )}
  
        {/* SME Selection (Optional) */}
        {selectedDirector && (
          <div className="dropdown">
            <label>Select SME (Optional):</label>
            <select onChange={(e) => setSelectedSME(e.target.value)} value={selectedSME}>
              <option value="">-- Select SME --</option>
              {selectedDirector.smes.map((sme, index) => (
                <option key={index} value={sme}>
                  {sme}
                </option>
              ))}
            </select>
          </div>
        )}
  
        {/* Buddy Selection (FTEs from Selected Supervisor) */}
        {selectedSupervisor && (
          <div className="dropdown">
            <label>Select Buddy (FTE from Supervisor's Team):</label>
            <select onChange={(e) => setSelectedBuddy(e.target.value)} value={selectedBuddy || ""}>
              <option value="">-- Select Buddy --</option>
              {selectedSupervisor.teamMembers.map((buddy) => (
                <option key={buddy.id} value={buddy.id}>
                  {buddy.name}
                </option>
              ))}
            </select>
          </div>
        )}
  
        {/* Confirm Mapping Button */}
        {selectedSupervisor && (
          <button className="map-button" onClick={handleMapping}>
            Confirm Mapping
          </button>
        )}
  
        {/* Display Mapped Details */}
        {isMapped && (
          <div className="mapping-summary">
            <h3>Mapping Summary:</h3>
            <p><strong>Intern:</strong> {selectedIntern?.name}</p>
            <p><strong>Director:</strong> {selectedDirector?.name}</p>
            <p><strong>Supervisor:</strong> {selectedSupervisor?.name}</p>
            {selectedSME && <p><strong>SME:</strong> {selectedSME}</p>}
            {selectedBuddy && <p><strong>Buddy:</strong> {selectedSupervisor?.teamMembers.find((b) => b.id == selectedBuddy)?.name}</p>}
            <p className="success-message">✅ Intern successfully mapped!</p>
          </div>
        )}
      </div>
    );
  };
  
  export default MapInterns;
