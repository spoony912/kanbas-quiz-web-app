import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { FaCircleCheck } from "react-icons/fa6";
import {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setQuizzes,
} from "../quizReducer";
import { KanbasState } from "../../../store";
import * as client from "../client";

function QuizDetails() {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToQuizDetailsEditor = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Details`);
  };
  const quizList = useSelector(
    (state: KanbasState) => state.quizReducer.quizzes
  );
  const quiz = quizList.find((q) => q.course === courseId && q._id === quizId);

  useEffect(() => {
    if (typeof courseId === "string") {
      client
        .findQuizzesForCourse(courseId)
        .then((quizzes) => dispatch(setQuizzes(quizzes)));
    }
  }, [courseId, dispatch]);

  const [quizPublish, updatePublish] = useState(quiz ? quiz.published : false);

  const handlePublish = (quizId: any | null, e: any) => {
    e.preventDefault();
    if (!quizId) return;
    const quiz = quizList.find((q) => q._id === quizId);
    if (quiz) {
      const updatedQuiz = { ...quiz, published: !quiz.published };
      client.updateQuiz(updatedQuiz).then(() => {
        dispatch(updateQuiz(updatedQuiz));
      });
    }
  };

  const handlePreviewClick = () => {
    if (quiz?._id) {
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Preview`);
    }
  };

  return (
    <div className="quiz-details-container">
      <div className="quiz-controls">
        {quiz ? (
          quiz && quiz.isPublished ? (
            <button
              className="control-button gray"
              onClick={(e) => handlePublish(quiz._id, e)}
            >
              Published
            </button>
          ) : (
            <button
              className="control-button gray"
              onClick={(e) => handlePublish(quiz._id, e)}
            >
              Unpublish
            </button>
          )
        ) : (
          <p>Loading...</p>
        )}

        <button className="control-button" onClick={handlePreviewClick}>
          Preview
        </button>
        <button
          className="control-button"
          onClick={navigateToQuizDetailsEditor}
        >
          Edit
        </button>
      </div>

      <h1 className="quiz-title">{quiz.title}</h1>
      <div className="quiz-detail">
        <strong>Quiz Type:</strong> {quiz.quizType}
      </div>
      <div className="quiz-detail">
        <strong>Points:</strong> {quiz.points}
      </div>
      <div className="quiz-detail">
        <strong>Assignment Group:</strong> {quiz.assignmentGroup}
      </div>
      <div className="quiz-detail">
        <strong>Shuffle Answers:</strong> {quiz.shuffleAnswers}
      </div>
      <div className="quiz-detail">
        <strong>Time Limit:</strong> {quiz.timeLimit}
      </div>
      <div className="quiz-detail">
        <strong>Multiple Attempts:</strong> {quiz.multipleAttempts}
      </div>
      <div className="quiz-detail">
        <strong>Show Correct Answers:</strong> {quiz.showCorrectAnswers}
      </div>
      <div className="quiz-detail">
        <strong>One Question at a Time:</strong> {quiz.oneQuestionAtATime}
      </div>
      <div className="quiz-detail">
        <strong>Webcam Required:</strong> {quiz.webcamRequired}
      </div>
      <div className="quiz-detail">
        <strong>Lock Questions After Answering:</strong>{" "}
        {quiz.lockQuestionsAfterAnswering}
      </div>
      <div className="quiz-detail">
        <strong>Due:</strong> {quiz.dueDate}
      </div>
      <div className="quiz-detail">
        <strong>For:</strong> Everyone
      </div>
      <div className="quiz-detail">
        <strong>Available from:</strong> {quiz.availableDate}
      </div>
      <div className="quiz-detail">
        <strong>Until:</strong> {quiz.untilDate}
      </div>
    </div>
  );
}
export default QuizDetails;
