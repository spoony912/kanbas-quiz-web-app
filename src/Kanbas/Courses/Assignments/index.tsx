//-----------------------------------------------------------------------------//
import React from "react"; // must
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa"; // icon
import { BsThreeDotsVertical } from "react-icons/bs"; // icon
import { Link, useParams, useNavigate } from "react-router-dom";
// import { assignments } from "../../Database"; // json
import * as db from "../../Database";
import { useSelector } from "react-redux";
import { KanbasState } from "../../store";
import { deleteAssignment } from "./assignmentsReducer";
import { useDispatch } from "react-redux";
//-----------------------------------------------------------------------------//
function Assignments() {
  const { courseId, assignmentId } = useParams();
  // const assignmentList = db.assignments.filter(
  //   (each: any) => each.course === courseId
  // ); // use courseId here
  const assignment = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignment
  );
  const assignmentList = useSelector((state: KanbasState) =>
    state.assignmentsReducer.assignments.filter(
      (each) => each.course === courseId
    )
  );
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const navigateToAssignmentEditor = () => {
    navigate(`/Kanbas/Courses/${courseId}/Assignments/new`);
  };
  const dispatch = useDispatch();

  const handleDelete = (_id: any) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this assignment?"
    );
    if (isConfirmed) {
      // delete
      dispatch(deleteAssignment(_id));
    } else {
      // no delete
    }
  };
  return (
    <>
      {/* Add buttons and other fields here  */}
      <div className="button-container d-flex align-items-center p-2">
        <input
          placeholder="Search for Assignment"
          className="search form-control w-25"
        />
        <div className="ms-auto button-group">
          <button
            className="btn-module"
            style={{ color: "black", backgroundColor: "lightgray" }}
          >
            + Group
          </button>
          <button className="btn-module" onClick={navigateToAssignmentEditor}>
            + Assignment
          </button>
          <button>
            <BsThreeDotsVertical />
          </button>
        </div>
      </div>

      {/* assignment content start*/}
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> Assignments
            <span className="float-end">
              <FaCheckCircle className="text-success" />
              <FaPlusCircle className="ms-2" />
              <FaEllipsisV className="ms-2" />
            </span>
          </div>

          <ul className="list-group">
            {assignmentList.map(({ _id, title }) => (
              <li key={_id} className="list-group-item">
                {/* delete button */}
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDelete(_id)}
                >
                  Delete
                </button>
                <FaEllipsisV className="me-2" />
                <Link to={`/Kanbas/Courses/${courseId}/Assignments/${_id}`}>
                  {title}
                </Link>
                {/* end at row: plus and 3-dot */}
                <span className="float-end">
                  <FaCheckCircle className="text-success" />
                  <FaEllipsisV className="ms-2" />
                </span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
}

export default Assignments;
