import { FaMagnifyingGlass } from "react-icons/fa6";
import React, { useState, useEffect, Component } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react"; // rich text editor
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"; // rich text editor
import { BsThreeDots } from "react-icons/bs"; // three dots

export default function QuizDetailAndQuestion() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const navigateToNewQuestion = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/NewQuiz`);
  };

  return (
    <div>
      <h1>Quiz Detail And Question</h1>
    </div>
  );
}
