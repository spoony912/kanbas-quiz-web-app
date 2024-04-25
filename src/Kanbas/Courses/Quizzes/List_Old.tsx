import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setQuizzes,
} from "./quizReducer";
import { KanbasState } from "../../store";
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

const selectStyles: React.CSSProperties = {
  backgroundColor: "#f1f1f1",
  border: "1px solid #ced4da",
  borderRadius: "4px",
  padding: "6px 12px",
  width: "100%",
  boxSizing: "border-box",
  outline: "none",
  boxShadow: "none",
};

const circleStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
};

function getAvailabilityStatus(quiz: any): string {
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

export default function QuizList_Old() {
  const { courseId, quizId } = useParams();
  const dispatch = useDispatch();
  const [handleQuizDelete, setQuizIdToDelete] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const quizList = useSelector((state: KanbasState) =>
    state.quizReducer.quizzes.filter((each) => each.course === courseId)
  );
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);

  const handleAddQuiz = async () => {
    if (courseId && quiz) {
      try {
        const newQuiz = await client.createQuiz(courseId, quiz);
        dispatch(addQuiz(newQuiz));
      } catch (error) {
        console.error("Failed to add quiz:", error);
      }
    }
  };

  const handleDeleteQuiz = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    quizId: string
  ) => {
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
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/Details`);
  };

  useEffect(() => {
    if (typeof courseId === "string") {
      client
        .findQuizzesForCourse(courseId)
        .then((quizzes) => dispatch(setQuizzes(quizzes)));
    }
  }, [courseId, dispatch]);

  return (
    <ul className="list-group">
      {/* <li className="list-group-item">
        <input
          value={quiz.name}
          onChange={(e) => dispatch(setQuiz({ ...quiz, name: e.target.value }))}
        />
        <br />
        <br />
        <textarea
          value={quiz.description}
          onChange={(e) =>
            dispatch(setQuiz({ ...quiz, description: e.target.value }))
          }
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <button
            onClick={handleAddQuiz}
            style={{
              backgroundColor: "green",
              color: "white",
              marginLeft: "5px",
            }}
          >
            Add
          </button>
          <button
            onClick={handleUpdateQuiz}
            style={{
              backgroundColor: "blue",
              color: "white",
              marginLeft: "5px",
            }}
          >
            Update
          </button>
        </div>
      </li> */}

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
            <Link
              className="nav-link"
              to={`/Kanbas/Courses/${courseId}/Quizzes/Details`}
            >
              + Quiz
            </Link>
          </nav>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="dropdown" style={{ marginRight: "10px" }}>
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
              >
                <FaEllipsisV />
              </button>
              <ul
                className={`dropdown-menu${dropdownOpen ? " show" : ""}`}
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <button className="dropdown-item" onClick={handleEdit}>
                    Edit
                  </button>
                </li>
                <li>
                  <button className="dropdown-item">Delete</button>
                </li>
                <li>
                  <button className="dropdown-item">Publish</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* <div style={{ marginTop: "10px" }} className="mb-2">
        <select style={selectStyles} aria-label="Default select example">
          <option>Assignment Quizzes</option>
        </select>
      </div> */}

      {/* <div
        style={{
          marginTop: "10px",
          borderBottom: "1px solid #ced4da",
          paddingBottom: "5px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <li>
              <FaRocket style={{ color: "green", marginRight: "5px" }} />
              <b>Q1 - HTML</b>
            </li>
            <h6>
              {getAvailabilityStatus(quiz)} | Due {quiz.dueDate} | {quiz.points}{" "}
              Points | {quiz.numQuestions} Questions
            </h6>
          </div>
          <div style={circleStyle}>
            <FaCheck
              style={{
                backgroundColor: "Green",
                color: "white",
                borderRadius: "50%",
                fontSize: "25px",
                marginLeft: "850px",
              }}
            />
          </div>
          <button aria-label="Default select example" className="btn-rounded">
            <FaEllipsisV />
          </button>
        </div>
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        ></div>
        <div>
          <li>
            <FaRocket style={{ color: "green", marginRight: "5px" }} />
            <b>Q2 - CSS</b>
          </li>
          <h6>
            {getAvailabilityStatus(quiz)} | Due {quiz.dueDate} | {quiz.points}{" "}
            Points | {quiz.numQuestions} Questions
          </h6>
        </div>
        <div style={circleStyle}>
          <FaBan
            style={{
              backgroundColor: "Red",
              color: "white",
              borderRadius: "50%",
              fontSize: "25px",
              width: "24px",
              height: "24px",
              marginLeft: "960px",
            }}
          />
        </div>
        <button aria-label="Default select example" className="btn-rounded">
          <FaEllipsisV />
        </button>
      </div> */}

      {quizList
        .filter((quiz) => quiz.course === courseId)
        .map((quiz, index) => (
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
                {quiz.description} | Due {quiz.dueDate} | {quiz.quizType} |{" "}
                {quiz.points} points{" "}
              </p>
              <p></p>
              <p></p>
            </div>
            <div>
              {/* <button
                onClick={() => dispatch(setQuiz(quiz))}
                style={{
                  backgroundColor: "yellow",
                  color: "black",
                  marginRight: "5px",
                }}
              >
                Edit
              </button> */}
              <button className="btn btn-primary" onClick={handleEdit}>
                Edit
              </button>
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
