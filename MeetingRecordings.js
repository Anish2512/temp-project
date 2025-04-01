import React, { useState } from "react";
import "./EventsStyles.css";

const MeetingRecordings = () => {
  // Mock data - in a real app, you would fetch this from your database
  const [recordings, setRecordings] = useState([
    {
      id: 1,
      meetingName: "Intern Orientation",
      date: "2025-03-15",
      recordingUrl: "https://example.com/recording1",
      presenter: "Sarah Johnson",
      duration: "1 hour 15 minutes"
    },
    {
      id: 2,
      meetingName: "Project Status Meeting",
      date: "2025-03-20",
      recordingUrl: "https://example.com/recording2",
      presenter: "Michael Chen",
      duration: "45 minutes"
    },
    {
      id: 3,
      meetingName: "Technical Workshop",
      date: "2025-03-25",
      recordingUrl: "https://example.com/recording3",
      presenter: "Priya Patel",
      duration: "2 hours"
    }
  ]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to add a new recording link
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecording, setNewRecording] = useState({
    meetingName: "",
    date: "",
    recordingUrl: "",
    presenter: "",
    duration: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecording({
      ...newRecording,
      [name]: value
    });
  };

  const addRecording = (e) => {
    e.preventDefault();
    const newId = recordings.length > 0 ? Math.max(...recordings.map(r => r.id)) + 1 : 1;
    
    setRecordings([...recordings, {
      id: newId,
      ...newRecording
    }]);
    
    setNewRecording({
      meetingName: "",
      date: "",
      recordingUrl: "",
      presenter: "",
      duration: ""
    });
    
    setShowAddForm(false);
  };

  return (
    <div className="recordings-container">
      <h1>Meeting Recordings</h1>
      
      <div className="recordings-controls">
        <button 
          className="create-button"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cancel" : "Add New Recording"}
        </button>
      </div>
      
      {showAddForm && (
        <div className="add-recording-form">
          <form onSubmit={addRecording} className="event-form">
            <div className="form-group">
              <label htmlFor="meetingName">Meeting Name</label>
              <input
                type="text"
                id="meetingName"
                name="meetingName"
                value={newRecording.meetingName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={newRecording.date}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="recordingUrl">Recording URL</label>
              <input
                type="url"
                id="recordingUrl"
                name="recordingUrl"
                value={newRecording.recordingUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/recording"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="presenter">Presenter</label>
              <input
                type="text"
                id="presenter"
                name="presenter"
                value={newRecording.presenter}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="duration">Duration</label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={newRecording.duration}
                onChange={handleInputChange}
                placeholder="e.g., 1 hour 30 minutes"
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-button">Add Recording</button>
              <button type="button" className="cancel-button" onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="recordings-list">
        {recordings.length > 0 ? (
          recordings.map((recording) => (
            <div key={recording.id} className="recording-card">
              <div className="recording-header">
                <h3>{recording.meetingName}</h3>
                <span className="recording-date">{formatDate(recording.date)}</span>
              </div>
              
              <div className="recording-details">
                <p><strong>Presenter:</strong> {recording.presenter}</p>
                <p><strong>Duration:</strong> {recording.duration}</p>
              </div>
              
              <div className="recording-actions">
                <a 
                  href={recording.recordingUrl} 
                  className="recording-link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <button className="view-recording-button">View Recording</button>
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="no-recordings">No recordings available.</p>
        )}
      </div>
    </div>
  );
};

export default MeetingRecordings;