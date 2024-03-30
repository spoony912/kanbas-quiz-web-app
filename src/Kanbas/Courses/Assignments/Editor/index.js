import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs"; // icon
import { TbCircleCheckFilled } from "react-icons/tb"; // icon
// import reducer
import {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  selectAssignment,
} from "../assignmentsReducer";
import { KanbasState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import * as client from "../client";

function AssignmentEditor() {
  const { assignmentId, courseId } = useParams();
  // const assignment = db.assignments.find((each) => each._id === assignmentId); // find assignment
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const assignments = useSelector((state) =>
    state.assignmentsReducer.assignments.filter(
      (each) => each.course === courseId
    )
  );

  const [assignmentDetails, setAssignmentDetails] = useState({
    _id: null,
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFromDate: "",
    availableUntilDate: "",
    course: courseId,
  });

  useEffect(() => {
    // existing ass
    if (assignmentId && assignmentId !== "new") {
      const assignmentToEdit = assignments.find(
        (assn) => assn._id === assignmentId
      );
      // Only set if assignmentToEdit is different from the current state to avoid infinite loops
      if (assignmentToEdit && assignmentToEdit._id !== assignmentDetails._id) {
        setAssignmentDetails(assignmentToEdit);
      }
    } else {
      // new ass
      if (assignmentDetails._id !== null) {
        setAssignmentDetails({
          _id: null,
          title: "",
          description: "",
          points: 100,
          dueDate: "",
          availableFromDate: "",
          availableUntilDate: "",
          course: courseId,
        });
      }
    }
  }, [assignmentId, assignments, courseId, assignmentDetails._id]);

  // const handleSave = () => {
  //   if (assignmentId === "new") {
  //     dispatch(addAssignment(assignmentDetails));
  //   } else {
  //     dispatch(updateAssignment(assignmentDetails));
  //   }
  //   navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  // };
  const handleSave = () => {
    // Debugging: Log to ensure assignmentDetails includes _id when updating
    console.log("Saving assignmentDetails:", assignmentDetails);

    const saveOperation =
      assignmentId === "new"
        ? client.createAssignment(courseId, assignmentDetails) // Create a new assignment
        : client.updateAssignment(assignmentDetails); // Update existing assignment

    saveOperation
      .then(() => {
        // After a successful operation, navigate back to the list of assignments
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
      })
      .catch((error) => {
        // Log any errors encountered during the save operation
        console.error("Error saving assignment:", error);
      });
  };

  const handleCancel = () =>
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);

  return (
    <div>
      <div
        className="mt-3"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <TbCircleCheckFilled style={{ color: "green" }} />

        <span style={{ color: "green", marginLeft: "10px" }}>Published</span>
        <button
          style={{
            marginLeft: "10px",
            padding: "5px 5px",
            border: "none",
            cursor: "pointer",
            display: "flex",
          }}
        >
          <BsThreeDotsVertical />
        </button>
      </div>
      <hr />
      <div>
        <h2 className=" mb-3">Assignment Name</h2>
        <input
          placeholder="New Assignment"
          className="form-control mb-2"
          value={assignmentDetails.title}
          onChange={(e) =>
            setAssignmentDetails({
              ...assignmentDetails,
              title: e.target.value,
            })
          }
        />
        <textarea
          className="form-control"
          placeholder="New Description"
          value={assignmentDetails.description}
          onChange={(e) =>
            setAssignmentDetails({
              ...assignmentDetails,
              description: e.target.value,
            })
          }
        />
        <h2>Point</h2>
        <input
          className="form-control"
          placeholder="100"
          type="number"
          value={assignmentDetails.points}
        />
        {/* --------------- Assign ---------------*/}
        <h2>Assign</h2>
        <div className="card">
          <div className="card-body">
            <label className="form-label">Due</label>
            <input
              type="date"
              className="form-control"
              value={assignmentDetails.dueDate}
            />
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <label>Available from</label>
                <input
                  type="date"
                  className="form-control"
                  value={assignmentDetails.availableFromDate}
                />
              </div>
              <div className="col-md-6">
                <label>Until</label>
                <input
                  type="date"
                  className="form-control"
                  value={assignmentDetails.availableUntilDate}
                />
              </div>
            </div>
          </div>
        </div>

        <hr />
        {/* -------------- Save button  --------------*/}
        <button className="btn btn-danger ms-2 float-end" onClick={handleSave}>
          Save
        </button>
        {/* -------------- Cancel button  --------------*/}
        <button
          onClick={handleCancel}
          className="btn  ms-2 float-end"
          style={{ backgroundColor: "lightgray" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AssignmentEditor;
