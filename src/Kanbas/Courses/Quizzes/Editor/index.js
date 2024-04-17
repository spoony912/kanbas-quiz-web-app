import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link, NavLink } from "react-router-dom";
import { HiOutlineBan } from "react-icons/hi";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { Editor } from "@tinymce/tinymce-react";

function QuizzesDetails() {
  const { courseId, assignmentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [quiz, setQuiz] = useState(
  //     {
  //         _id: null,
  //         title: "",
  //         description: "",
  //         due: "",
  //         totalPoints: 100,
  //         course: courseId,
  //     }
  // );

  // useEffect(() => {
  //     // existing ass
  //     if (assignmentId && assignmentId !== "new") {
  //       const assignmentToEdit = assignments.find(
  //         (assn) => assn._id === assignmentId
  //       );
  //       // Only set if assignmentToEdit is different from the current state to avoid infinite loops
  //       if (assignmentToEdit && assignmentToEdit._id !== assignment._id) {
  //         setAssignment(assignmentToEdit);
  //       }
  //     } else {
  //       // new ass
  //       if (assignment._id !== null) {
  //         setAssignment({
  //           _id: null,
  //           title: "",
  //           description: "",
  //           toalPoints: 100,
  //           dueDate: "",
  //           course: courseId,
  //         });
  //       }
  //     }
  //   }, [assignmentId, assignments, courseId, assignment._id]);

  // const handleSave = () => {
  //     console.log("Saving assignmentDetails:", assignment);

  //     const saveOperation =
  //       assignmentId === "new"
  //         ? client.createAssignment(courseId, assignment) // Create a new assignment
  //         : client.updateAssignment(assignment); // Update existing assignment

  //     saveOperation
  //       .then(() => {
  //         // After a successful operation, navigate back to the list of assignments
  //         navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  //       })
  //       .catch((error) => {
  //         // Log any errors encountered during the save operation
  //         console.error("Error saving assignment:", error);
  //       });
  //   };

  // const handleCancel = () => {
  //     navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  // }

  // const handleTitleChange = ((e) => {
  //     setAssignment({
  //         ...assignment,
  //         title: e.target.value,
  //     });
  // });

  // const handleDecriptionChange = ((e) => {
  //     setAssignment({
  //         ...assignment,
  //         description: e.target.value,
  //     });
  // });

  // const handleDueChange = ((e) => {
  //     setAssignment({
  //         ...assignment,
  //         due: e.target.value,
  //     });
  // });

  // const handleTotalPointsChange = ((e) => {
  //     setAssignment({
  //         ...assignment,
  //         totalPoints: parseInt(e.target.value),
  //     });
  // });

  // Quiz text editor content
  const [text, setText] = useState("");
  const [value, setValue] = useState("<p>Quiz Instructions</p>");

  //access code
  const [accessCode, setAccessCode] = useState("");

  const handleAccessCodeChange = (e) => {
    setAccessCode(e.target.value);
  };

  return (
    <>
      <div className="d-flex justify-content-end align-items-center me-4 ">
        <div className="me-3">Points 0</div>
        <div className="me-3" style={{ color: "gray" }}>
          <HiOutlineBan /> Not Published
        </div>
        <button type="button" className="btn btn-outline-dark btn-light">
          <HiEllipsisVertical />
        </button>
      </div>
      <hr className="me-4" />

      {/* ------------Tab------------------- */}
      <div>
        <nav class="nav nav-tabs mt-2">
          <Link
            class="nav-link active"
            to={`/Kanbas/Courses/${courseId}/Quizzes/Details`}
          >
            Details
          </Link>
          <Link
            class="nav-link"
            style={{ color: "red" }}
            to={`/Kanbas/Courses/${courseId}/Quizzes/Questions`}
          >
            Questions
          </Link>
        </nav>
        <br />
      </div>

      <div>
        <input
          id="quizTitle"
          className="form-control mb-2"
          placeholder="Unnamed Quiz"
          // value={quiz.title}
          // onChange={handleTitleChange}
        />{" "}
        <br />
        Quiz Instructions: <br />
        <Editor
          apiKey="81zmyhxc6njj4nq5jzzfeq4h70yojjr4aki254xmhai5dcwz"
          onEditorChange={(newValue, editor) => {
            setValue(newValue);
            setText(editor.getContent({ format: "text" }));
          }}
          onInit={(evt, editor) => {
            setText(editor.getContent({ format: "text" }));
          }}
          init={{
            plugins:
              "a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template tinydrive tinymcespellchecker typography visualblocks visualchars wordcount",
          }}
        />
      </div>
      <div className="container">
        <div className="d-flex justify-content-left">
          <div className="w-75">
            <div className="mt-4 row">
              <label
                htmlFor="quiz-type"
                className="col-sm-4 col-form-label text-end"
              >
                Quiz Type
              </label>
              <div className="col-sm-8">
                <select className="form-select" id="quiz-type">
                  <option selected>Graded Quiz</option>
                  <option value="practiceQuiz">Practice Quiz</option>
                  <option value="survey">Graded Survey</option>
                  <option value="ungradedSurvey">Ungraded Survey</option>
                </select>
              </div>
            </div>
            <div className="mt-4 row">
              <label
                htmlFor="quiz-group"
                className="col-sm-4 col-form-label text-end"
              >
                Assignment Group
              </label>
              <div className="col-sm-8">
                <select className="form-select" id="quiz-group">
                  <option selected>QUIZZES</option>
                  <option value="assignments">ASSIGNMENTS</option>
                  <option value="exams">EXAMS</option>
                  <option value="project">PROJECT</option>
                </select>
              </div>
            </div>
            <div className="mt-4 row">
              <div className="col-sm-4"></div>
              <div className="col-sm-8">
                <b>Options</b>
                <div className="form-check mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="shuffle-answer"
                    checked
                  />
                  <label className="form-check-label" htmlFor="shuffle-answer">
                    Shuffle Answers
                  </label>
                </div>
                <div className="form-check mt-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="time-limit"
                    checked
                  />
                  <label className="form-check-label" htmlFor="time-limit">
                    Time Limit
                  </label>
                  <input
                    className="time-input"
                    type="number"
                    id="time-value"
                    defaultValue={20}
                    min={1}
                  />
                  <label className="form-check-label" htmlFor="time-value">
                    Minutes
                  </label>
                </div>
                <div className="border p-1 mt-3">
                  <div className="mb-1 ">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="multiple-attempt"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="multiple-attempt"
                    >
                      Allow Multiple Attempts
                    </label>
                  </div>
                </div>
                <div className="form-check mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="show-answer"
                  />
                  <label className="form-check-label" htmlFor="show-answer">
                    Show Correct Answers
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="one-question"
                    checked
                  />
                  <label className="form-check-label" htmlFor="one-question">
                    One Question at a Time
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="webcam"
                  />
                  <label className="form-check-label" htmlFor="webcam">
                    Webcam Required
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="lock-question"
                  />
                  <label className="form-check-label" htmlFor="lock-question">
                    Lock Questions After Answering
                  </label>
                </div>
                <div className="form-check mt-2">
                  <label htmlFor="access-code"> Access Code: </label>
                  <input
                    type="text"
                    id="access-code"
                    name="access-code"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* -----------------Assign To Part ------------------- */}
            <div className="mt-4 row">
              <label
                htmlFor="assignment-assign"
                className="col-sm-4 col-form-label text-end"
              >
                Assign
              </label>
              <div className="col-sm-8 border p-3">
                <div className="mb-1">
                  <label
                    htmlFor="assign-to"
                    className="fw-bold col-form-label text-start"
                  >
                    Assign To
                  </label>
                  <input
                    className="form-control pb-2"
                    id="assign-to"
                    value="Everyone"
                  />
                </div>
                <div className="mb-1">
                  <label
                    htmlFor="quiz-due"
                    className="fw-bold col-form-label text-start"
                  >
                    Due
                  </label>
                  <input
                    className="form-control pb-2"
                    id="quiz-due"
                    type="date"
                  />

                  <div className="row mb-1">
                    <div className="col">
                      <label
                        htmlFor="quiz-available-from"
                        className="fw-bold col-form-label text-start"
                      >
                        Available from
                      </label>
                      <input
                        className="form-control pb-2"
                        id="quiz-available-from"
                        type="date"
                      />
                    </div>
                    <div className="col">
                      <label
                        htmlFor="quiz-available-until"
                        className="fw-bold col-form-label text-start"
                      >
                        Until
                      </label>
                      <input
                        className="form-control pb-2"
                        id="quiz-available-until"
                        type="date"
                      />
                    </div>
                  </div>
                  <div className="mb-1 row">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-secondary btn-light mt-3"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
              //todo: navigate to quiz list screen
              // onClick={handleCancel}
              className="btn btn-secondary btn-outline-dark btn-lg btn-light me-2"
            >
              Cancel
            </button>

            <button
              type="button"
              //todo: save and navigate to quiz list screen
              // onClick={handleSaveandPublish}
              className="btn btn-secondary btn-outline-dark btn-lg btn-light me-2"
            >
              Save & Publish
            </button>

            <button
              type="button"
              //todo:  save and go to details screen
              // onClick={handleSave}
              className="btn btn-primary btn-lg btn-danger "
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
export default QuizzesDetails;
