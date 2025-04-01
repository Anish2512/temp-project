import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "./EventsContext";
import "./EventsStyles.css";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { addEvent } = useEvents();
  
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    time: "",
    participants: "",
    description: "",
    duration: "60" // Default duration in minutes
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create start and end dates for calendar
    const eventDate = new Date(eventData.date);
    const [hours, minutes] = eventData.time.split(':').map(Number);
    
    const startDate = new Date(eventDate);
    startDate.setHours(hours, minutes);
    
    const endDate = new Date(startDate);
    endDate.setMinutes(startDate.getMinutes() + parseInt(eventData.duration));
    
    // Create an event object suitable for both list view and calendar
    const newEvent = {
      id: Date.now(), // Simple unique ID
      title: eventData.name, // For calendar display
      start: startDate,
      end: endDate,
      ...eventData
    };
    
    // Add the event using the context
    addEvent(newEvent);
    
    console.log("Event created:", newEvent);
    alert("Event added to calendar!");
    
    // Redirect to the view events page
    navigate('/view-events');
  };

  return (
    <div className="create-event-container">
      <h1>Create New Event</h1>
      
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label htmlFor="name">Event Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="time">Start Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={eventData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration (minutes)</label>
          <select
            id="duration"
            name="duration"
            value={eventData.duration}
            onChange={handleChange}
            required
          >
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="90">1.5 hours</option>
            <option value="120">2 hours</option>
            <option value="180">3 hours</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="participants">Participants (comma separated)</label>
          <input
            type="text"
            id="participants"
            name="participants"
            value={eventData.participants}
            onChange={handleChange}
            placeholder="e.g., John Doe, Jane Smith"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-button">Add to Calendar</button>
          <button type="button" className="cancel-button" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;