// AssignedCourses.js
import React, { useEffect, useState } from "react";
import "./AssignedCourses.css";
import coursesData from "./AssignedCourses.json"; // Adjust the path based on your directory structure

const AssignedCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(coursesData); // Load data from JSON file
  }, []);

  return (
    <div className="assigned-courses-container">
      <h2>Assigned Courses</h2>
      <div className="courses-list">
        {courses.length === 0 ? (
          <p>No courses assigned yet.</p>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AssignedCourses;