import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setQuizzes,
  togglePublishQuiz,
} from "./quizReducer";
import * as client from "./client";
import {
  FaBan,
  FaBars,
  FaCheck,
  FaEllipsisV,
  FaGlasses,
  FaRocket,
} from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import { Button } from "react-bootstrap";

const selectStyles = {
  backgroundColor: "#f1f1f1",
  border: "1px solid #ced4da",
  borderRadius: "4px",
  padding: "6px 12px",
  width: "100%",
  boxSizing: "border-box",
  outline: "none",
  boxShadow: "none",
};

const circleStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
};

function getAvailabilityStatus(quiz) {
  const currentDate = new Date();
  const availableDate = new Date(quiz.availableDate);
  const availableUntilDate = new Date(quiz.availableUntilDate);

  if (currentDate < availableDate) {
    return `Not available until ${availableDate.toLocaleDateString()}`;
  } else if (currentDate > availableUntilDate) {
    return "Closed";
  } else if (
    currentDate >= availableDate &&
    currentDate <= availableUntilDate
  ) {
    return "Available";
  } else {
    return "";
  }
}
function QuizList() {
  const { courseId, quizId } = useParams();
  const dispatch = useDispatch();
  const [handleQuizDelete, setQuizIdToDelete] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const quizList = useSelector((state) =>
    state.quizReducer.quizzes.filter((each) => each.course === courseId)
  );
  const quiz = useSelector((state) => state.quizReducer.quiz);
  console.log("Quiz details:", quiz);

  const handleAddQuiz = async () => {
    if (courseId && quiz) {
      try {
        const newQuiz = await client.createQuiz(courseId, quiz);
        dispatch(addQuiz(newQuiz));
      } catch (error) {
        console.error("Failed to add quiz:", error);
      }
    }
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/NewQuiz`);
  };

  const handleDeleteQuiz = async (event, quizId) => {
    try {
      await client.deleteQuiz(courseId, quizId);
      dispatch(deleteQuiz(quizId));
    } catch (error) {
      console.error("Failed to delete quiz:", error);
    }
  };

  const handleUpdateQuiz = async () => {
    try {
      const status = await client.updateQuiz(courseId, quiz._id, quiz);
      if (status) {
        dispatch(updateQuiz(quiz));
      }
    } catch (error) {
      console.error("Failed to update quiz:", error);
    }
  };

  const handleEdit = async () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`);
  };

  useEffect(() => {
    if (typeof courseId === "string") {
      client
        .findQuizzesForCourse(courseId)
        .then((quizzes) => dispatch(setQuizzes(quizzes)));
    }
  }, [courseId, dispatch]);

  // isPublished
  const handleTogglePublish = (quizId) => {
    dispatch(togglePublishQuiz(quizId));
  };
  return (
    <ul className="list-group">
      <div className="mb-5">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FaBars />
          <h3>Quizzes</h3>
          <button
            type="button"
            aria-label="Default select example"
            className="btn-rounded"
            style={{ marginLeft: "auto", padding: "10px" }}
          >
            <FaGlasses /> Student View
          </button>
        </div>
        <hr />
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "auto" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search for Quiz"
            />
          </div>
          <nav className="btn btn-danger">
            <button className="btn btn-danger" onClick={handleAddQuiz}>
              + Quiz
            </button>
            {/* <Link
              className="nav-link"
              to={`/Kanbas/Courses/${courseId}/Quizzes/NewQuiz`}
            >
              + Quiz
            </Link> */}
          </nav>
        </div>
      </div>

      {quizList.map((quiz, index) => (
        <li
          key={index}
          className="list-group-item"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}>
              {quiz.title}
            </Link>
            <p>
              {quiz.isPublished ? "Published" : "Unpublished"} | Due{" "}
              {quiz.dueDate} | {quiz.numberOfQuestion} questions | {quiz.points}{" "}
              points
            </p>
          </div>
          <div>
            <button
              className="btn"
              onClick={() => handleTogglePublish(quiz._id)}
              style={{ marginRight: "10px" }}
            >
              {quiz.isPublished ? "✅" : "🚫"}
            </button>
            <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}>
              <Button className="btn btn-primary">Edit</Button>
            </Link>
            <button
              className="btn btn-danger"
              onClick={(event) => handleDeleteQuiz(event, quiz._id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default QuizList;
