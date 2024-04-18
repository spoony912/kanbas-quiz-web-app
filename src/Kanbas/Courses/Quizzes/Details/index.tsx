import React from "react";
import "./index.css";

function QuizDetails() {
  const quizInfo = {
    title: "Q1 - HTML",
    quizType: "Graded Quiz",
    points: 29,
    assignmentGroup: "QUIZZES",
    shuffleAnswers: "No",
    timeLimit: "20 Minutes",
    multipleAttempts: "No",
    showCorrectAnswers: "Immediately",
    asscessCode: "",
    oneQuestionAtATime: "Yes",
    webcamRequired: "No",
    lockQuestionsAfterAnswering: "No",
    dueDate: "Sep 21 at 1pm",
    availableDate: "Sep 21 at 11:40am",
    untilDate: "Sep 21 at 1pm",
  };
  return (
    <div className="quiz-details-container">
      <h1 className="quiz-title">{quizInfo.title}</h1>
      <div className="quiz-detail">
        <strong>Quiz Type:</strong> {quizInfo.quizType}
      </div>
      <div className="quiz-detail">
        <strong>Points:</strong> {quizInfo.points}
      </div>
      <div className="quiz-detail">
        <strong>Assignment Group:</strong> {quizInfo.assignmentGroup}
      </div>
      <div className="quiz-detail">
        <strong>Shuffle Answers:</strong> {quizInfo.shuffleAnswers}
      </div>
      <div className="quiz-detail">
        <strong>Time Limit:</strong> {quizInfo.timeLimit}
      </div>
      <div className="quiz-detail">
        <strong>Multiple Attempts:</strong> {quizInfo.multipleAttempts}
      </div>
      <div className="quiz-detail">
        <strong>Show Correct Answers:</strong> {quizInfo.showCorrectAnswers}
      </div>
      <div className="quiz-detail">
        <strong>One Question at a Time:</strong> {quizInfo.oneQuestionAtATime}
      </div>
      <div className="quiz-detail">
        <strong>Webcam Required:</strong> {quizInfo.webcamRequired}
      </div>
      <div className="quiz-detail">
        <strong>Lock Questions After Answering:</strong>{" "}
        {quizInfo.lockQuestionsAfterAnswering}
      </div>
      <div className="quiz-detail">
        <strong>Due:</strong> {quizInfo.dueDate}
      </div>
      <div className="quiz-detail">
        <strong>For:</strong> Everyone
      </div>
      <div className="quiz-detail">
        <strong>Available from:</strong> {quizInfo.availableDate}
      </div>
      <div className="quiz-detail">
        <strong>Until:</strong> {quizInfo.untilDate}
      </div>
      <div className="quiz-controls">
        <button className="control-button green">Publish</button>
        <button className="control-button">Preview</button>
        <button className="control-button">Edit</button>
      </div>
    </div>
  );
}
export default QuizDetails;
