import React, { useState } from "react";
import "./AddCourses.css";

const AddCourses = () => {
  const [courseUrl, setCourseUrl] = useState("");
  const [studentName, setStudentName] = useState("");
  const [courses, setCourses] = useState([]);

  const handleAddCourse = async () => {
    if (!courseUrl.trim() || !studentName.trim()) {
      alert("Please enter both the course URL and the student name.");
      return;
    }

    const metadata = await fetchMetaData(courseUrl);
    const newCourse = {
      url: courseUrl,
      student: studentName,
      title: metadata.title || "Unknown Course",
      image: metadata.image || "https://via.placeholder.com/150",
    };

    setCourses([...courses, newCourse]);
    setCourseUrl("");
    setStudentName("");
  };

  const handleDeleteCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const fetchMetaData = async (url) => {
    try {
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/${url}`
      );
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");

      const title =
        doc.querySelector("meta[property='og:title']")?.content || doc.title;
      const image = doc.querySelector("meta[property='og:image']")?.content;

      return { title, image };
    } catch (error) {
      console.error("Error fetching metadata:", error);
      return {};
    }
  };

  return (
    <div className="add-courses-container">
      <h2>Add Course</h2>
      <div className="input-group">
        <label>Course URL:</label>
        <input
          type="text"
          value={courseUrl}
          onChange={(e) => setCourseUrl(e.target.value)}
          placeholder="Enter course link..."
        />
      </div>
      <div className="input-group">
        <label>Assign to Student:</label>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Enter student name..."
        />
      </div>
      <button className="add-button" onClick={handleAddCourse}>
        Add Course
      </button>

      <div className="course-tiles">
        {courses.map((course, index) => (
          <div key={index} className="course-tile">
            <img
              src={course.image}
              alt={course.title}
              className="course-image"
            />
            <div className="course-info">
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="course-title"
              >
                {course.title}
              </a>
              <p className="student-name">Assigned to: {course.student}</p>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDeleteCourse(index)}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCourses;
