import { FaMagnifyingGlass } from "react-icons/fa6";
import React, { useState, useEffect, Component } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react"; // rich text editor
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"; // rich text editor
import { BsThreeDots } from "react-icons/bs"; // three dots

function Quiz() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const navigateToNewQuestion = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/NewQuiz`);
  };

  return (
    <div>
      <h1>Quiz</h1>
      {/* 3 buttons */}
      {/* to a new page to edit quiz question */}
      <button
        className="btn btn-primary"
        onClick={navigateToNewQuestion}
        style={{ marginRight: "10px" }}
      >
        + New Question
      </button>
      <button className="btn btn-primary" style={{ marginRight: "10px" }}>
        + New Question Group
      </button>
      <button className="btn btn-primary">
        <FaMagnifyingGlass />
        Find Questions
      </button>
      {/* 3 buttons */}


    </div>
  );
}

export default Quiz;
