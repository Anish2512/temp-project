import React, { useState } from "react";
import "./AddCourses.css";

const AddCourses = () => {
  const [courseDomain, setCourseDomain] = useState(""); // Domain selection
  const [courseUrl, setCourseUrl] = useState("");
  const [courses, setCourses] = useState([]);

  const handleAddCourse = async () => {
    if (!courseDomain || !courseUrl.trim()) {
      alert("Please select a domain and enter the course URL.");
      return;
    }

    const metadata = await fetchMetaData(courseUrl);
    const newCourse = {
      domain: courseDomain,
      url: courseUrl,
      title: metadata.title || "Unknown Course",
      image: metadata.image || "https://via.placeholder.com/150",
    };

    setCourses([...courses, newCourse]);
    setCourseDomain(""); // Reset dropdown
    setCourseUrl("");
  };

  const handleDeleteCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const fetchMetaData = async (url) => {
    try {
      // Use Microlink API (Free tier available)
      const response = await fetch(
        `https://api.microlink.io/?url=${encodeURIComponent(url)}`
      );
      const data = await response.json();

      return {
        title: data?.data?.title || "Unknown Course",
        image: data?.data?.image?.url || "https://via.placeholder.com/150",
      };
    } catch (error) {
      console.error("Error fetching metadata:", error);
      return {
        title: "Unknown Course",
        image: "https://via.placeholder.com/150",
      };
    }
  };

  return (
    <div className="add-courses-container">
      <h2>Add Course</h2>

      {/* Domain Selection */}
      <div className="input-group">
        <label>Select Course Domain:</label>
        <select
          value={courseDomain}
          onChange={(e) => setCourseDomain(e.target.value)}
        >
          <option value="">Select Domain</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Cloud Computing">Cloud Computing</option>
          <option value="AI/ML">AI/ML</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="Data Science">Data Science</option>
        </select>
      </div>

      {/* Course URL Input */}
      <div className="input-group">
        <label>Course URL:</label>
        <input
          type="text"
          value={courseUrl}
          onChange={(e) => setCourseUrl(e.target.value)}
          placeholder="Enter course link..."
        />
      </div>

      {/* Add Course Button */}
      <button className="add-button" onClick={handleAddCourse}>
        Add Course
      </button>

      {/* Display Added Courses */}
      <div className="course-tiles">
        {courses.map((course, index) => (
          <div key={index} className="course-tile">
            <img
              src={course.image}
              alt={course.title}
              className="course-image"
            />
            <div className="course-info">
              <p className="course-domain">
                <strong>Domain:</strong> {course.domain}
              </p>
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="course-title"
              >
                {course.title}
              </a>
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
