import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
// import { FaMagnifyingGlass } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { HiOutlineBan } from "react-icons/hi";
import { HiEllipsisVertical } from "react-icons/hi2";
import { FaCheckCircle } from "react-icons/fa";
import * as client from "../client";

export default function QuizQuestionMain() {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({
    quizType: "Graded Quiz",
    assignmentGroup: "QUIZZES",
    timeLimit: "20 Minutes",
    isTimeLimitEnabled: true,
    shuffleAnswers: true,
    multipleAttempts: false,
    showCorrectAnswers: "Immediately",
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    oneQuestionAtATime: true,
    isPublished: false,
  });

  useEffect(() => {
    if (quizId && quizId !== "NewQuiz") {
      client
        .fetchQuizById(courseId, quizId)
        .then((QuizDetails) => {
          setQuiz({
            _id: QuizDetails._id,
            description: QuizDetails.description,
            course: QuizDetails.course,
            title: QuizDetails.title,
            quizType: QuizDetails.quizType || "Graded Quiz",
            points: QuizDetails.points,
            assignmentGroup: QuizDetails.assignmentGroup || "QUIZZES",
            shuffleAnswers:
              QuizDetails.shuffleAnswers !== undefined
                ? QuizDetails.shuffleAnswers
                : true,
            timeLimit: QuizDetails.timeLimit,
            isTimeLimitEnabled:
              QuizDetails.isTimeLimitEnabled !== undefined
                ? QuizDetails.isTimeLimitEnabled
                : true,
            multipleAttempts:
              QuizDetails.multipleAttempts !== undefined
                ? QuizDetails.multipleAttempts
                : false,
            showCorrectAnswers: QuizDetails.showCorrectAnswers || "Immediately",
            accessCode: QuizDetails.accessCode,
            oneQuestionAtATime:
              QuizDetails.oneQuestionAtATime !== undefined
                ? QuizDetails.oneQuestionAtATime
                : true,
            webcamRequired:
              QuizDetails.webcamRequired !== undefined
                ? QuizDetails.webcamRequired
                : false,
            lockQuestionsAfterAnswering:
              QuizDetails.lockQuestionsAfterAnswering !== undefined
                ? QuizDetails.lockQuestionsAfterAnswering
                : false,
            dueDate: QuizDetails.dueDate,
            availableDate: QuizDetails.availableDate,
            untilDate: QuizDetails.untilDate,
            isPublished:
              QuizDetails.isPublished !== undefined
                ? QuizDetails.isPublished
                : false,
          });
        })
        .catch((error) => {
          console.error("Error fetching quiz:", error);
        });
    } else {
      if (quiz._id !== null) {
        setQuiz({
          _id: quiz.length + 1,
          description: "",
          course: courseId,
          title: "",
          quizType: "Graded Quiz",
          points: 100,
          assignmentGroup: "QUIZZES",
          shuffleAnswers: true,
          timeLimit: "20 Minutes",
          multipleAttempts: false,
          showCorrectAnswers: "Immediately",
          accessCode: "",
          oneQuestionAtATime: true,
          webcamRequired: false,
          lockQuestionsAfterAnswering: false,
          dueDate: "",
          availableDate: "",
          untilDate: "",
        });
      }
    }
  }, [courseId, quizId, quiz._id]);

  const navigateToNewQuestion = () => {
    navigate(
      `/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions/NewQuestions`
    );
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
  };

  const handleSave = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions`);
  };

  const handleSaveAndPublish = () => {
    if (!quiz.isPublished) {
      quiz.isPublished = true;
    }
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions`);
  };
  useEffect(() => {
    client
      .fetchQuestions(courseId, quizId)
      .then((questions) => {
        setQuestions(questions);
      })
      .catch((error) => {
        console.error("Failed to fetch questions:", error);
      });
  }, [courseId, quizId]);

  return (
    <>
      {/* top start */}
      <div className="d-flex justify-content-end align-items-center me-4 ">
        <div className="me-3">Points {quiz.points}</div>
        {quiz.isPublished ? (
          <div className="me-3" style={{ color: "green" }}>
            <FaCheckCircle /> isPublished
          </div>
        ) : (
          <div className="me-3" style={{ color: "gray" }}>
            <HiOutlineBan /> Not isPublished
          </div>
        )}
        <button type="button" className="btn btn-outline-dark btn-light">
          <HiEllipsisVertical />
        </button>
      </div>
      {/* top end */}

      <hr className="me-4" />

      <div>
        {/* nav bar start */}
        <nav className="nav nav-tabs mt-2">
          <Link
            className="nav-link"
            to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Details`}
          >
            Details
          </Link>
          <Link
            className="nav-link active"
            style={{ color: "red" }}
            to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions`}
          >
            Questions
          </Link>
        </nav>
        {/* nav bar end */}

        <br />

        {/* three buttons start */}
        <div>
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
            <FaSearch />
            Find Questions
          </button>
        </div>
        {/* three buttons end */}
      </div>

      {/* display all new created questions */}
      <div className="mt-3">
        {questions.map((question) => (
          <div key={question._id}>
            <strong>Question:</strong>
            <span
              style={{ display: "inline-block", marginLeft: "10px" }}
              dangerouslySetInnerHTML={{ __html: question.text }}
            />
            <br />
          </div>
        ))}
      </div>
      <hr />
      <form>
        <div className="d-flex justify-content-between align-items-center">
          <label className="d-flex align-items-center">
            <input type="checkbox" className="me-1" />
            Notify users this quiz has changed
          </label>
          <div>
            <button
              type="button"
              className="btn btn-secondary btn-outline-dark btn-lg btn-light me-2"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-outline-dark btn-lg btn-light me-2"
              onClick={handleSaveAndPublish}
            >
              Save & Publish
            </button>

            <button
              type="button"
              className="btn btn-primary btn-lg btn-danger "
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </form>
      <hr />
    </>
  );
}
