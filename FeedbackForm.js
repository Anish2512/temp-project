import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FeedbackForm.css"; // Add styles for better UI

const FeedbackForm = () => {
  const navigate = useNavigate();

  // State to store feedback form data
  const [feedback, setFeedback] = useState({
    domain: "",
    understanding: "",
    trainerEffectiveness: "",
    contentQuality: "",
    overallExperience: "",
    additionalComments: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulating API call (Replace with actual API integration)
    try {
      const response = await fetch(
        "https://your-backend-api.com/submit-feedback",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(feedback),
        }
      );

      if (response.ok) {
        alert("Feedback submitted successfully!");
        navigate("/intern-dashboard"); // Redirect after submission
      } else {
        alert("Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="feedback-container">
      <h2>Training Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Select Training Domain */}
        <label>Training Domain:</label>
        <select
          name="domain"
          value={feedback.domain}
          onChange={handleChange}
          required
        >
          <option value="">Select Domain</option>
          <option value="React">React</option>
          <option value="Java">Java</option>
          <option value="Cloud Computing">Cloud Computing</option>
          <option value="Data Science">Data Science</option>
        </select>

        {/* Understanding of Training */}
        <label>How well did you understand the training?</label>
        <input
          type="text"
          name="understanding"
          value={feedback.understanding}
          onChange={handleChange}
          required
          placeholder="E.g., Very clear, Somewhat clear..."
        />

        {/* Trainer Effectiveness */}
        <label>How effective was the trainer?</label>
        <input
          type="text"
          name="trainerEffectiveness"
          value={feedback.trainerEffectiveness}
          onChange={handleChange}
          required
          placeholder="E.g., Excellent, Average..."
        />

        {/* Content Quality */}
        <label>How was the content quality?</label>
        <input
          type="text"
          name="contentQuality"
          value={feedback.contentQuality}
          onChange={handleChange}
          required
          placeholder="E.g., Well-structured, Needs improvement..."
        />

        {/* Overall Experience */}
        <label>How was your overall experience?</label>
        <input
          type="text"
          name="overallExperience"
          value={feedback.overallExperience}
          onChange={handleChange}
          required
          placeholder="E.g., Great, Needs more examples..."
        />

        {/* Additional Comments */}
        <label>Additional Comments (Optional):</label>
        <textarea
          name="additionalComments"
          value={feedback.additionalComments}
          onChange={handleChange}
          placeholder="Any additional feedback..."
        />

        {/* Submit Button */}
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
