// QueryForum.js (Updated with Mock Data)
import React, { useState, useEffect } from "react";
import "./QueryForum.css";
import { FaQuestionCircle, FaRegCommentDots } from "react-icons/fa";
import mockData from "./QueryData.json"; // Importing mock data

const QueryForum = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const loggedInUser = "John Doe"; // Mock logged-in user

  useEffect(() => {
    setQuestions(mockData.questions); // Load mock data
  }, []);

  const handleQuestionSubmit = () => {
    if (newQuestion.trim() !== "") {
      const newQ = {
        id: questions.length + 1,
        question: newQuestion,
        askedBy: loggedInUser,
        answers: [],
      };
      setQuestions([...questions, newQ]);
      setNewQuestion("");
    }
  };

  const handleAnswerSubmit = (index, answer) => {
    if (answer.trim() !== "") {
      const updatedQuestions = [...questions];
      updatedQuestions[index].answers.push({ answer, answeredBy: loggedInUser });
      setQuestions(updatedQuestions);
    }
  };

  return (
    <div className="query-forum-container">
      <h2 className="query-title">Query Forum</h2>
      <div className="post-question">
        <textarea
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Ask a question..."
        />
        <button onClick={handleQuestionSubmit}>Post</button>
      </div>
      <div className="questions-list">
        {questions.length === 0 ? (
          <p className="no-questions">No questions yet. Be the first to ask!</p>
        ) : (
          questions.map((q, index) => (
            <div key={q.id} className="question-card">
              <p className="question-text">
                <FaQuestionCircle className="question-icon" /> <strong>{q.askedBy}:</strong> {q.question}
              </p>
              <div className="answers">
                {q.answers.length > 0 ? (
                  q.answers.map((ans, ansIndex) => (
                    <p key={ansIndex} className="answer-text">
                      <FaRegCommentDots className="answer-icon" /> <strong>{ans.answeredBy}:</strong> {ans.answer}
                    </p>
                  ))
                ) : (
                  <p className="no-answers">No answers yet.</p>
                )}
              </div>
              <div className="answer-input">
                <input
                  type="text"
                  placeholder="Write your answer..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAnswerSubmit(index, e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QueryForum;
