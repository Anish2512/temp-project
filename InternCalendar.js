import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // Enables event click interactions
import "./InternCalendar.css"; // Import CSS file for styling

const InternCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/data/InternCalendar.json") // ✅ Fetch from the correct location
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="calendar-container">
      <h2>Intern Calendar 📅</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={(info) => alert(`Event: ${info.event.title}`)} // Popup on event click
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        height="auto"
      />
    </div>
  );
};

export default InternCalendar;
