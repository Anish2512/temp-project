// EventsDashboard.js
import React from "react";
import { Link } from "react-router-dom";
import "./EventsDashboard.css";

const EventsDashboard = () => {
  return (
    <div className="events-dashboard">
      <h1>Events & Meetings Management</h1>
      
      <div className="events-options">
        <div className="events-card">
          <h2>Create Events</h2>
          <p>Schedule new events and meetings for interns and team members</p>
          <Link to="/create-event">
            <button className="event-button">Create New Event</button>
          </Link>
        </div>
        
        <div className="events-card">
          <h2>View & Edit Events</h2>
          <p>Manage your existing events and make changes as needed</p>
          <Link to="/view-events">
            <button className="event-button">View All Events</button>
          </Link>
        </div>
        
        <div className="events-card">
          <h2>Meeting Recordings</h2>
          <p>Access recorded meetings and collect feedback</p>
          <Link to="/meeting-recordings">
            <button className="event-button">Access Recordings</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventsDashboard;