// new

import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import * as client from "../client";
import { togglePublishQuiz } from "../quizReducer";
export default function QuizDetails() {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quiz, setQuiz] = useState({
    _id: "",
    description: "",
    course: "",
    title: "",
    quizType: "",
    points: "",
    assignmentGroup: "",
    shuffleAnswers: false,
    timeLimit: "",
    multipleAttempts: false,
    showCorrectAnswers: "",
    accessCode: "",
    oneQuestionAtATime: false,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "",
    availableDate: "",
    untilDate: "",
    isPublished: false,
  });

  useEffect(() => {
    if (quizId === "NewQuiz") {
      setQuiz({
        _id: "New Quiz",
        description: "",
        course: { courseId },
        title: "New Quiz",
        quizType: "Graded Quiz",
        points: "",
        assignmentGroup: "QUIZZES",
        shuffleAnswers: true,
        timeLimit: "20 mins",
        multipleAttempts: false,
        showCorrectAnswers: "",
        accessCode: "",
        oneQuestionAtATime: false,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: "",
        availableDate: "",
        untilDate: "",
        isPublished: false,
      });
    }
    client
      .fetchQuizById(courseId, quizId)
      .then((QuizDetails) => {
        setQuiz({
          ...QuizDetails,
          shuffleAnswers: booleanToYesNo(QuizDetails.shuffleAnswers),
          multipleAttempts: booleanToYesNo(QuizDetails.multipleAttempts),
          oneQuestionAtATime: booleanToYesNo(QuizDetails.oneQuestionAtATime),
          webcamRequired: booleanToYesNo(QuizDetails.webcamRequired),
          lockQuestionsAfterAnswering: booleanToYesNo(
            QuizDetails.lockQuestionsAfterAnswering
          ),
          //   isPublished: booleanToYesNo(QuizDetails.isPublished),
          isPublished: QuizDetails.isPublished,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [courseId, quizId]);

  function booleanToYesNo(value) {
    return value ? "Yes" : "No";
  }

  const navigateToQuizDetailsEditor = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Details`);
  };

  const navigateToPreviewScreen = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Preview`);
  };

  const handlePublish = () => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      isPublished: !prevQuiz.isPublished, // This toggles the state between true and false
    }));
  };
  // isPublished
  const handleTogglePublish = (quizId) => {
    dispatch(togglePublishQuiz(quizId));
  };

  return (
    <div className="quiz-details-container">
      <div className="d-flex justify-content-end align-items-center me-4 mt-5">
        {/* {quiz.isPublished ? (
          <button
            type="button"
            className="me-3 btn btn-success"
            onClick={handlePublish}
          >
            Publish
          </button>
        ) : (
          <button type="button" className="me-3 btn btn-danger">
            UnPublish
          </button>
        )} */}
        <button
          type="button"
          className="me-3 btn btn-success"
          onClick={handlePublish}
        >
          {quiz.isPublished ? "Publish" : "Unpublish"}
          {/* {quiz.isPublished} */}
        </button>
        <button
          type="button"
          className="me-3 btn btn-outline-dark btn-light"
          onClick={navigateToPreviewScreen}
        >
          Preview
        </button>

        <button
          type="button"
          className="me-3 btn btn-outline-dark btn-light"
          onClick={navigateToQuizDetailsEditor}
        >
          Edit
        </button>
      </div>
      <hr className="me-4" />

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

      {/* ------------Date Table------------------------ */}
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
