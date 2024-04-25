import React, { useState, useEffect, Component } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react"; // rich text editor
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"; // rich text editor
import { BsThreeDots } from "react-icons/bs"; // three dots
import * as client from "../client";

export default function MultipleChoiceQuestion() {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState("How much is 1 + 1 ?");
  const [questionType, setQuestionType] = useState("Multiple Choice"); // questionType
  const [question, setQuestion] = useState({
    title: "",
    description: "",
    point: 1,
    questionType: "Multiple Choice",
    choices: [
      { id: 1, text: "True", isCorrect: false },
      // { id: 2, text: "False", isCorrect: false },
    ],
  });
  // delete
  // const [choices, setChoices] = useState([
  //   { id: 1, text: "True", isCorrect: false },
  //   { id: 2, text: "False", isCorrect: false },
  // ]);

  // filter quiz
  const fetchQuestionByType = async (type) => {
    const quiz = await client.findQuestionByType(type);
    setQuestion({ ...question, quiz });
  };

  useEffect(() => {
    if (questionType === "True/False") {
      setText("Is 1 + 1 = 2 ?");
      setQuestion({
        ...question,
        choices: [
          { id: 1, text: "True", isCorrect: question.choices[0]?.isCorrect },
          { id: 2, text: "False", isCorrect: question.choices[1]?.isCorrect },
        ],
      });
    } else if (questionType === "Multiple Choice") {
      setText("How much is 1 + 1 ?");
    } else {
      setText("1 + 1 is _____");
    }
  }, [questionType]);

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

  const handleSave = async () => {
    try {
      const questionData = {
        text: text, // The text from CKEditor
        points: question.point, // Points for the question
        questionType: questionType,
        // new added
        choices: question.choices.map((choice) => ({
          // Properly format choices to exclude the 'id' if it's not needed
          text: choice.text,
          isCorrect: choice.isCorrect,
        })),
      };
      const response = await client.createQuestion(
        courseId,
        quizId,
        questionData
      );
      console.log("Question saved:", response);
    } catch (error) {
      console.error("Failed to save question:", error);
    }
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions`);
  };
  // button cancel
  const handleCancel = () =>
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions`);
  // Handle the change in quiz type
  // const handleQuizTypeChange = (event) => {
  //   const type = event.target.value;
  //   setQuizType(type);
  //   if (type === "True/False") {
  //     setChoices([
  //       { id: 1, text: "True", isCorrect: false },
  //       { id: 2, text: "False", isCorrect: false },
  //     ]);
  //   } else {
  //     setChoices([]); // Clear choices for other types, assuming multiple choice starts empty
  //   }
  // };
  const handleQuestionTypeChange = (event) => {
    const type = event.target.value;
    setQuestionType(type);
    if (type === "True/False") {
      setQuestion({
        ...question,
        choices: [
          { id: 1, text: "True", isCorrect: false },
          { id: 2, text: "False", isCorrect: false },
        ],
      });
    } else if (type === "Fill In Multiple Blanks") {
      setQuestion({
        ...question,
        choices: [{ id: 1, text: "", correctAnswers: [""] }],
      });
    } else {
      setQuestion({ ...question, choices: [] }); // Clear choices for other types
    }
  };

  // Update choice to mark it as correct
  // const handleChoiceChange = (id) => {
  //   setChoices(
  //     choices.map((choice) => ({ ...choice, isCorrect: choice.id === id }))
  //   );
  // };
  const handleChoiceChange = (id) => {
    setQuestion({
      ...question,
      choices: question.choices.map((choice) => ({
        ...choice,
        isCorrect: choice.id === id,
      })),
    });
  };

  // set correct answer
  const setCorrectAnswer = async () => {};
  return (
    <div
      className="mt-3"
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <h1>{questionType} Quiz</h1>
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
        <select
          className="form-control"
          style={{ width: "200px" }}
          value={questionType}
          // onChange={(e) => {
          //   const selectedType = e.target.value;
          //   setQuizType(selectedType);
          //   fetchQuizByType(selectedType);
          // }}
          onChange={handleQuestionTypeChange}
        >
          <option value="Multiple Choice">Multiple Choice</option>
          <option value="True/False">True/False</option>
          <option value="Fill In Multiple Blanks">
            Fill In Multiple Blanks
          </option>
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
      {/* rich text editor */}
      <div className="editor mb-5">
        <CKEditor
          editor={ClassicEditor}
          data={text}
          onChange={(event, editor) => {
            const data = editor.getData();
            setText(data);
          }}
        />
      </div>

      {/* answer management */}
      <h3>Answers:</h3>
      <p style={{ color: "green" }}>
        Correct Answer:{" "}
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

      {/* correct answer */}
      {/* {quizType === "True/False" ? (
        // if true/false question
        <label>
          <input type="radio" />
        </label>
      ) : (
        // non true/false question

        <input placeholder="correct answer" className="form-control" />
      )} */}
      {questionType === "True/False" ? (
        <div>
          <label>
            <input
              type="radio"
              value="True"
              checked={question.choices[0].isCorrect}
              onChange={() => handleChoiceChange(1)} // Assuming the first choice is "True"
            />
            True
          </label>
          <label>
            <input
              type="radio"
              value="False"
              checked={question.choices[1].isCorrect}
              onChange={() => handleChoiceChange(2)} // Assuming the second choice is "False"
            />
            False
          </label>
        </div>
      ) : (
        <input
          placeholder="Enter the correct answer"
          className="form-control"
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
      )}

      <div
        style={{ display: "flex", justifyContent: "flex-end" }}
        className="mt-2"
      >
        <button
          className="btn btn-light"
          style={{ border: "none", marginLeft: "10px" }}
          onClick={addChoice}
        >
          + Add Another Answer
        </button>

        {/* possible answers */}
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

      {/* save and cancel --- return to previous page */}
      <div className="mt-5">
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
      </div>
    </div>
  );
}
