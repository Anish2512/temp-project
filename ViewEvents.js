import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useEvents } from "./EventsContext";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./EventsStyles.css";

// Setup the localizer for the calendar
const localizer = momentLocalizer(moment);

const ViewEvents = () => {
  const { events, updateEvent, deleteEvent } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'calendar'

  const handleEdit = (event) => {
    setSelectedEvent(event);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(id);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEvent({
      ...selectedEvent,
      [name]: value
    });
  };

  const handleUpdate = () => {
    // First, create updated datetime objects
    const updatedDate = new Date(selectedEvent.date);
    const [hours, minutes] = selectedEvent.time.split(':').map(Number);
    
    const updatedStart = new Date(updatedDate);
    updatedStart.setHours(hours, minutes);
    
    const durationMinutes = parseInt(selectedEvent.duration || 60);
    const updatedEnd = new Date(updatedStart);
    updatedEnd.setMinutes(updatedStart.getMinutes() + durationMinutes);
    
    const updatedEvent = {
      ...selectedEvent,
      title: selectedEvent.name,
      start: updatedStart,
      end: updatedEnd
    };
    
    updateEvent(updatedEvent);
    setSelectedEvent(null);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleEventSelect = (calEvent) => {
    // Find the event in our state array to get all details
    const event = events.find(e => e.id === calEvent.id);
    if (event) {
      setSelectedEvent(event);
    }
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "calendar" : "list");
  };

  // Format the time for display
  const formatTime = (dateObj) => {
    if (!dateObj) return "";
    return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="view-events-container">
      <h1>View & Edit Events</h1>
      
      {selectedEvent ? (
        <div className="edit-event-form">
          <h2>Edit Event</h2>
          <div className="form-group">
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={selectedEvent.name}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={selectedEvent.date || (selectedEvent.start ? selectedEvent.start.toISOString().split('T')[0] : '')}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={selectedEvent.time || (selectedEvent.start ? 
                `${String(selectedEvent.start.getHours()).padStart(2, '0')}:${String(selectedEvent.start.getMinutes()).padStart(2, '0')}` : '')}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="duration">Duration (minutes)</label>
            <select
              id="duration"
              name="duration"
              value={selectedEvent.duration || '60'}
              onChange={handleChange}
            >
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
              <option value="180">3 hours</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="participants">Participants</label>
            <input
              type="text"
              id="participants"
              name="participants"
              value={selectedEvent.participants || ''}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={selectedEvent.description || ''}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>
          
          <div className="form-actions">
            <button onClick={handleUpdate} className="update-button">
              Update Event
            </button>
            <button onClick={() => setSelectedEvent(null)} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="events-controls">
            <Link to="/create-event">
              <button className="create-button">Create New Event</button>
            </Link>
            <button onClick={toggleViewMode} className="view-toggle-button">
              {viewMode === "list" ? "Switch to Calendar View" : "Switch to List View"}
            </button>
          </div>
          
          {viewMode === "calendar" ? (
            <div className="calendar-container">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectEvent={handleEventSelect}
                views={['month', 'week', 'day']}
              />
            </div>
          ) : (
            <div className="events-list">
              {events.length > 0 ? (
                events.map((event) => (
                  <div key={event.id} className="event-card">
                    <div className="event-header">
                      <h3>{event.title || event.name}</h3>
                      <div className="event-actions">
                        <button onClick={() => handleEdit(event)} className="edit-button">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(event.id)} className="delete-button">
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    <div className="event-details">
                      <p><strong>Date:</strong> {event.date ? formatDate(event.date) : (event.start ? formatDate(event.start) : 'N/A')}</p>
                      <p><strong>Time:</strong> {event.time || (event.start ? formatTime(event.start) : 'N/A')}</p>
                      <p><strong>Duration:</strong> {event.duration ? `${event.duration} minutes` : 'N/A'}</p>
                      <p><strong>Participants:</strong> {event.participants || 'N/A'}</p>
                      <p><strong>Description:</strong> {event.description || 'N/A'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-events">No events scheduled. Click "Create New Event" to add one.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewEvents;