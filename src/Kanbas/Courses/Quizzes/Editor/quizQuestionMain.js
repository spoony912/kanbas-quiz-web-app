import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
// import { FaMagnifyingGlass } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

import { HiOutlineBan } from "react-icons/hi";
import { HiEllipsisVertical } from "react-icons/hi2";

export default function QuizQuestionMain() {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();

  const navigateToNewQuestion = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions/NewQuestions`);
  };

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
    </>
  );
}
