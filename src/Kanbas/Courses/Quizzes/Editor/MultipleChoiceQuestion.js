import { FaMagnifyingGlass } from "react-icons/fa6";
import React, { useState, useEffect, Component } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react"; // rich text editor
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"; // rich text editor
import { BsThreeDots } from "react-icons/bs"; // three dots
export default function MultipleChoiceQuestion() {
  //************************************* MC quiz start **************************************
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [question, setQuestion] = useState({
    title: "",
    description: "",
    point: 1,
    choices: [{ id: 1, text: "", isCorrect: true }],
  });
  // add another answer
  const addChoice = () => {
    const newId = question.choices.length + 1;
    const newChoice = {
      id: newId,
      text: "",
      isCorrect: false,
    };
    setQuestion({ ...question, choices: [...question.choices, newChoice] });
  };
  // delete answer
  const deleteChoice = (choiceId) => {
    const newChoices = question.choices.filter(
      (choice) => choice.id !== choiceId
    );
    setQuestion({ ...question, choices: newChoices });
  };
  const handleSave = () => {};
  const handleCancel = () => navigate(`/Kanbas/Courses/${courseId}/Quizzes`);

  //************************************* MC quiz end **************************************

  return (
    <div
      className="mt-3"
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <h1>Multiple Choice Quiz</h1>
      {/************************************* MC quiz start **************************************/}
      <div
        className="mt-3"
        style={{
          display: "flex",
          width: "100%",
          gap: "20px",
        }}
      >
        <input
          type="text"
          style={{ width: "200px" }}
          placeholder="Question Title"
          className="form-control "
          value={question.title}
          onChange={(e) =>
            setQuestion({
              ...question,
              title: e.target.value,
            })
          }
        />
        <select className="form-control" style={{ width: "200px" }}>
          <option>Multiple Choice</option>
          <option>True/False</option>
          <option>Fill In Multiple Blanks</option>
        </select>
        <p>pts:</p>
        <input
          className="form-control"
          type="number"
          placeholder="1"
          style={{ width: "50px" }}
          value={question.point}
          onChange={(e) =>
            setQuestion({
              ...question,
              point: e.target.value,
            })
          }
        />
      </div>
      <hr />
      <p>
        Enter your question and multiple answers, then select the one correct
        answer.
      </p>
      <h4>Question:</h4>
      <br />

      <div className="editor mb-5">
        <CKEditor
          editor={ClassicEditor}
          data={text}
          config={{
            placeholder: "How much is 1 + 1?",
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setText(data);
          }}
        />
      </div>
      {/* answer part */}
      <div>
        <h4>Answers:</h4>
        {/* correct answer */}
        <div className="mb-2">
          <p style={{ color: "green" }}>
            Correct Answer:
            <button
              className="btn btn-light"
              style={{ border: "none", marginLeft: "10px" }}
            >
              <BsThreeDots size={24} style={{ color: "#333" }} />
            </button>
          </p>
          <input placeholder="correct answers" className="form-control" />
        </div>
        {/* possible answer */}
        {/* <div className="mb-2">
          <p style={{ color: "red" }}>
            Possible Answer:
            <button
              className="btn btn-light"
              style={{ border: "none", marginLeft: "10px" }}
            >
              edit
            </button>
            <button
              className="btn btn-light"
              style={{ border: "none", marginLeft: "10px" }}
            >
              delete
            </button>
            <button
              className="btn btn-light"
              style={{ border: "none", marginLeft: "10px" }}
            >
              <BsThreeDots size={24} style={{ color: "#333" }} />
            </button>
          </p>
          <input placeholder="possible answers" className="form-control" />
        </div> */}

        {/* button: add another answer */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            className="btn btn-light"
            style={{ border: "none", marginLeft: "10px" }}
            onClick={addChoice}
          >
            + Add Another Answer
          </button>
        </div>
        {question.choices.map((choice, index) => (
          <div>
            <p style={{ color: "red" }}>
              Possible Answer:
              <button
                className="btn btn-light"
                style={{ border: "none", marginLeft: "10px" }}
              >
                edit
              </button>
              <button
                className="btn btn-light"
                style={{ border: "none", marginLeft: "10px" }}
                onClick={() => deleteChoice(choice.id)}
              >
                delete
              </button>
              <button
                className="btn btn-light"
                style={{ border: "none", marginLeft: "10px" }}
              >
                <BsThreeDots size={24} style={{ color: "#333" }} />
              </button>
            </p>
            <input placeholder="possible answers" className="form-control" />
          </div>
        ))}
      </div>
      {/* save and cancel --- return to previous page*/}
      <button
        className="btn btn-primary"
        style={{ marginRight: "10px" }}
        onClick={handleCancel}
      >
        Cancel
      </button>
      <button className="btn btn-danger" onClick={handleSave}>
        Update Question
      </button>
      {/************************************* MC quiz end **************************************/}
      <input
        placeholder="Question Title"
        className="form-control mb-2"
        value={question.title}
        onChange={(e) =>
          setQuestion({
            ...question,
            title: e.target.value,
          })
        }
      />
    </div>
  );
}
