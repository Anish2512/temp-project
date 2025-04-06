import React, { useEffect, useState } from "react";
import "./InternAssignedTasks.css";

const mockTasks = [
  {
    id: 1,
    title: "Fix UI bugs on dashboard",
    description: "Resolve alignment issues on the sidebar and topbar.",
    dueDate: "2025-04-10",
    status: "In Progress",
    assignedTo: "intern123"
  },
  {
    id: 2,
    title: "Create Edit Profile Page",
    description: "Design and implement an edit profile layout for interns.",
    dueDate: "2025-04-05",
    status: "Pending",
    assignedTo: "intern123"
  },
  {
    id: 3,
    title: "API Testing",
    description: "Test the authentication and messaging APIs.",
    dueDate: "2025-04-08",
    status: "Completed",
    assignedTo: "intern123"
  }
];

const loggedInInternId = "intern123";

const InternAssignedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [proofs, setProofs] = useState({});

  useEffect(() => {
    const assignedTasks = mockTasks.filter(task => task.assignedTo === loggedInInternId);
    setTasks(assignedTasks);
  }, []);

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(/\s+/g, "");
  };

  const handleFileChange = (taskId, file) => {
    setProofs({ ...proofs, [taskId]: file.name });
    // You would usually upload the file to server here
    console.log("Uploaded file for task", taskId, file);
  };

  return (
    <div className="assigned-tasks-container">
      <h2>Your Assigned Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks assigned to you yet.</p>
      ) : (
        <div className="task-list">
          {tasks.map(task => (
            <div className="task-card" key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p><strong>Due:</strong> {task.dueDate}</p>
              <span className={`status ${getStatusClass(task.status)}`}>{task.status}</span>

              {task.status !== "Completed" && (
                <div className="upload-section">
                  <label htmlFor={`file-${task.id}`}>Upload proof of completion:</label>
                  <input
                    type="file"
                    id={`file-${task.id}`}
                    onChange={(e) => handleFileChange(task.id, e.target.files[0])}
                  />
                  {proofs[task.id] && <p className="uploaded-file">📎 {proofs[task.id]}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InternAssignedTasks;
