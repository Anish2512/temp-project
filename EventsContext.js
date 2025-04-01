import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the Events context
const EventsContext = createContext();

// Hook to use the Events context
export const useEvents = () => useContext(EventsContext);

// Provider component for the Events context
export const EventsProvider = ({ children }) => {
  // State for events
  const [events, setEvents] = useState([]);
  
  // State for recordings
  const [recordings, setRecordings] = useState([]);

  // Load events from localStorage when the component mounts
  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents);
      
      // Convert date strings to Date objects
      const processedEvents = parsedEvents.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end)
      }));
      
      setEvents(processedEvents);
    }
    
    const storedRecordings = localStorage.getItem('recordings');
    if (storedRecordings) {
      setRecordings(JSON.parse(storedRecordings));
    } else {
      // Set some default recordings if none exist
      const defaultRecordings = [
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
      ];
      setRecordings(defaultRecordings);
      localStorage.setItem('recordings', JSON.stringify(defaultRecordings));
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);
  
  // Save recordings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('recordings', JSON.stringify(recordings));
  }, [recordings]);

  // Add a new event
  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  // Update an existing event
  const updateEvent = (updatedEvent) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  // Delete an event
  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };
  
  // Add a new recording
  const addRecording = (recording) => {
    setRecordings([...recordings, recording]);
  };

  return (
    <EventsContext.Provider value={{
      events,
      recordings,
      addEvent,
      updateEvent,
      deleteEvent,
      addRecording,
      setRecordings
    }}>
      {children}
    </EventsContext.Provider>
  );
};