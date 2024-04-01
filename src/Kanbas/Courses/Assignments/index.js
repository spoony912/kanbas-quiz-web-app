import React, {useState, useEffect} from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../index.css"
import { HiEllipsisVertical} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import * as client from "./client";
import { addAssignment, updateAssignment, deleteAssignment, setAssignments, selectAssignment } from "./assignmentsReducer";


function Assignments() {
    const {courseId, assignmentId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const assignmentList = useSelector((state) => state.assignmentsReducer.assignments.filter((each) => each.course === courseId));
    const assignment = useSelector((state) => state.assignmentsReducer.assignment);

    useEffect(()=>{
      client.findAssignmentsForCourse(courseId)
      .then( (assignments) => dispatch(setAssignments(assignments)));
    
    },[courseId, dispatch]);

    // const handleAddAssignment = () => {
    //   navigate(`/Kanbas/Courses/${courseId}/Assignments/new`);
    // };

    const handleAddAssignment = () => {
      addAssignment(courseId, assignment).then((assignment) => {
        dispatch(addAssignment(assignment));
      });
    };

    const handleDeleteAssignment = (assignmentId) => {
        client
          .deleteAssignment(assignmentId)
          .then(() => {
            dispatch(deleteAssignment(assignmentId));
          })
          .catch((error) => {
            console.error("Failed to delete assignment:", error);
          });
    };

    const navigateToAssignmentEditor = () => {
      navigate(`/Kanbas/Courses/${courseId}/Assignments/new`);
    };

  
    return(
        <>
            
            <div className="wd-full-width">
              <div className="me-4">
              <script src="../../../bootstrap/js/bootstrap.bundle.min.js"></script>
                <div className="container-fluid me-2 ms-1 me-4">
                    <div className="d-flex justify-content-between me-3">
                        <form className="w-40">
                            <input type="text" className="form-control" placeholder="Search for Assignment" />
                        </form>
                        <div className="float-end">
                            <button type="button" className="btn btn-outline-dark btn-light me-1"> + Group</button>
                            <button type="button" className="btn btn-danger me-1" onClick = {navigateToAssignmentEditor}> + Assignment</button>
                            <button type="button" className="btn btn-outline-dark btn-light me-1">
                                 <HiEllipsisVertical />
                            </button>
                        </div>
                    </div>
                </div>
              </div>
              <hr className="mt-4 mb-4 me-3" />
              <ul className="list-group wd-modules  ">
                <li className="list-group-item wd-green-left-border">
                  <div >
                    <FaEllipsisV className="me-2" /> ASSIGNMENTS
                    <span className="float-end">
                      <FaCheckCircle className="text-success" />
                      <span className="wd-eclipse ms-2">
                            40% of Total
                      </span>
                      <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
                    </span>
                  </div>
                  <ul className="list-group">
                    {assignmentList.map((assignment) => (
                      <li key={assignment._id} className="list-group-item">
                        <FaEllipsisV className="me-2" />
                        <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`} className="wd-no-underline">{assignment.title}</Link>
                        <span className="float-end">
                          <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" /></span>
                          <hr/>
                          <span className="wd-smalltext">
                              Due: {assignment.due} | Total Points: {assignment.totalPoints}
                          </span>
                          <button type="button" className="btn btn-danger float-end me-1" onClick={ () => {
                            handleDeleteAssignment(assignment._id);
                          }}>Delete</button>
                      </li>))}
                  </ul>
                </li>
              </ul>
             

            </div>

        </>
    )
        }

      
export default Assignments;