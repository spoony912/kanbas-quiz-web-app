import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
// import { FaMagnifyingGlass } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { HiOutlineBan } from "react-icons/hi";
import { HiEllipsisVertical } from "react-icons/hi2";
import * as client from "../client";

export default function QuizQuestionMain() {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  const navigateToNewQuestion = () => {
    navigate(
      `/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions/NewQuestions`
    );
  };

  // display new created question
  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     const fetchedQuestions = await client.findQuizzesForCourse(courseId);
  //     setQuestions(fetchedQuestions);
  //   };

  //   fetchQuestions();
  // }, [courseId, quizId]);

  useEffect(() => {
    client
      .findQuizzesForCourse(courseId)
      .then((questions) => {
        setQuestions(questions);
      })
      .catch((error) => {
        console.error("Failed to fetch questions:", error);
      });
  }, [courseId]);

  return (
    <>
      {/* top start */}
      <div className="d-flex justify-content-end align-items-center me-4 ">
        <div className="me-3">Points 0</div>
        <div className="me-3" style={{ color: "gray" }}>
          <HiOutlineBan /> Not Published
        </div>
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
            to={`/Kanbas/Courses/${courseId}/Quizzes/Details`}
          >
            Details
          </Link>
          <Link
            className="nav-link active"
            style={{ color: "red" }}
            to={`/Kanbas/Courses/${courseId}/Quizzes/Questions`}
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
      <div>
        {questions.map((question) => (
          <div key={question._id}>
            <h3>{question.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: question.description }} />
            {/* Render other parts of the question as needed */}
          </div>
        ))}
      </div>
    </>
  );
}
