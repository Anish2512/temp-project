import React, { useState } from "react";
import "./GamificationTeam.css";

const allInterns = [
  "Alice", "Bob", "Charlie", "David", "Eve",
  "Frank", "Grace", "Hank", "Ivy", "Jack"
];

const GamificationTeam = () => {
  const [interns, setInterns] = useState(allInterns);
  const [numTeams, setNumTeams] = useState(2);
  const [teams, setTeams] = useState([]);

  // Create Teams based on chosen number
  const generateTeams = () => {
    let newTeams = [];
    for (let i = 0; i < numTeams; i++) {
      newTeams.push({
        name: `Team ${String.fromCharCode(65 + i)}`, // Auto-generates Team A, B, C...
        members: [],
      });
    }
    setTeams(newTeams);
  };

  // Handle team name changes
  const updateTeamName = (index, newName) => {
    let updatedTeams = [...teams];
    updatedTeams[index].name = newName;
    setTeams(updatedTeams);
  };

  // Handle intern selection
  const assignIntern = (teamIndex, intern) => {
    let updatedTeams = [...teams];
    updatedTeams[teamIndex].members.push(intern);

    // Remove selected intern from dropdown
    setInterns(interns.filter((i) => i !== intern));
    setTeams(updatedTeams);
  };

  return (
    <div className="gamification-container">
      <h1>Create Gamification Teams</h1>

      {/* Select Number of Teams */}
      <label>Choose number of teams:</label>
      <input
        type="number"
        value={numTeams}
        min="2"
        max={interns.length}
        onChange={(e) => setNumTeams(parseInt(e.target.value))}
      />
      <button onClick={generateTeams}>Generate Teams</button>

      {/* Display Teams */}
      <div className="teams-container">
        {teams.map((team, index) => (
          <div key={index} className="team-card">
            {/* Editable Team Name */}
            <input
              type="text"
              value={team.name}
              onChange={(e) => updateTeamName(index, e.target.value)}
            />

            <h3>Interns:</h3>
            <ul>
              {team.members.map((member, idx) => (
                <li key={idx}>{member}</li>
              ))}
            </ul>

            {/* Dropdown to Add Intern */}
            {interns.length > 0 && (
              <select
                onChange={(e) => assignIntern(index, e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>Select Intern</option>
                {interns.map((intern, idx) => (
                  <option key={idx} value={intern}>
                    {intern}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button className="submit-btn">Submit Teams</button>
    </div>
  );
};

export default GamificationTeam;
