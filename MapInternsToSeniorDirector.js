import React, { useState } from "react";
import "./MapInternsToSeniorDirector.css"; // Import CSS for styling

const seniorDirectors = [
  { id: 1, name: "Alice Johnson", org: "Tech Solutions" },
  { id: 2, name: "Bob Smith", org: "InnovateX" },
  { id: 3, name: "Charlie Brown", org: "Future Ventures" },
];

const initialInterns = [
  { id: 101, name: "John Doe" },
  { id: 102, name: "Jane Smith" },
  { id: 103, name: "Emily Davis" },
  { id: 104, name: "Michael Johnson" },
  { id: 105, name: "Sarah Wilson" },
];

const MapInternsToSeniorDirector = () => {
  const [selectedDirector, setSelectedDirector] = useState("");
  const [availableInterns, setAvailableInterns] = useState(initialInterns);
  const [selectedInterns, setSelectedInterns] = useState([]);
  const [mapping, setMapping] = useState({}); // Stores mappings of directors to interns

  const handleDirectorChange = (event) => {
    const directorId = event.target.value;
    setSelectedDirector(directorId);
  };

  const handleInternSelection = (internId) => {
    setSelectedInterns((prevSelected) =>
      prevSelected.includes(internId)
        ? prevSelected.filter((id) => id !== internId)
        : [...prevSelected, internId]
    );
  };

  const handleSubmit = () => {
    if (!selectedDirector || selectedInterns.length === 0) {
      alert("Please select a senior director and at least one intern.");
      return;
    }

    // Store the mapping
    setMapping((prevMapping) => ({
      ...prevMapping,
      [selectedDirector]: [...(prevMapping[selectedDirector] || []), ...selectedInterns],
    }));

    // Remove selected interns from available interns
    setAvailableInterns((prevInterns) =>
      prevInterns.filter((intern) => !selectedInterns.includes(intern.id))
    );

    // Reset selections
    setSelectedInterns([]);
    alert("Interns successfully mapped!");
  };

  return (
    <div className="map-container">
      <h2>Map Interns to Senior Director</h2>
      
      <label htmlFor="senior-director">Select Senior Director:</label>
      <select
        id="senior-director"
        value={selectedDirector}
        onChange={handleDirectorChange}
        className="dropdown"
      >
        <option value="">-- Select Director --</option>
        {seniorDirectors.map((director) => (
          <option key={director.id} value={director.id}>
            {director.name} - {director.org}
          </option>
        ))}
      </select>

      {selectedDirector && (
        <>
          <h3>Available Interns:</h3>
          <div className="intern-list">
            {availableInterns.length > 0 ? (
              availableInterns.map((intern) => (
                <label key={intern.id} className="intern-item">
                  <input
                    type="checkbox"
                    checked={selectedInterns.includes(intern.id)}
                    onChange={() => handleInternSelection(intern.id)}
                  />
                  {intern.name}
                </label>
              ))
            ) : (
              <p>No interns available.</p>
            )}
          </div>

          <button onClick={handleSubmit} className="submit-btn">
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default MapInternsToSeniorDirector;
