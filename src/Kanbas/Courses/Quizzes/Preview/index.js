// import * as client from "../client";
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// export default function Preview() {
//   const { courseId, quizId } = useParams();
//   const [questions, setQuestions] = useState([]);
//   useEffect(() => {
//     client
//       .fetchQuestions(courseId, quizId)
//       .then((questions) => {
//         setQuestions(questions);
//       })
//       .catch((error) => {
//         console.error("Failed to fetch questions:", error);
//       });
//   }, [courseId, quizId]);
//   // const [questionType, setQuestionType]=useSta
//   return (
//     <div>
//       <h3>Preview</h3>
//       {questions.map((question) => (
//         <div key={question._id}>
//           {/* <h3>{question.title}</h3> */}
//           <div dangerouslySetInnerHTML={{ __html: question.text }} />
//           {/* Render other parts of the question as needed */}
//         </div>
//       ))}
//     </div>
//   );
// }

// 1

// import * as client from "../client";
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// export default function Preview() {
//   const { courseId, quizId } = useParams();
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     client
//       .fetchQuestions(courseId, quizId)
//       .then((receivedQuestions) => {
//         setQuestions(receivedQuestions);
//       })
//       .catch((error) => {
//         console.error("Failed to fetch questions:", error);
//       });
//   }, [courseId, quizId]);

//   return (
//     <div>
//       <h3>Quiz Preview</h3>
//       {questions.map((question, index) => (
//         <div key={index} style={{ marginBottom: "20px" }}>
//           <div>
//             <strong>Type:</strong> {question.questionType}
//           </div>
//           <div>
//             <strong>Question:</strong>{" "}
//             <span dangerouslySetInnerHTML={{ __html: question.text }} />
//           </div>
//           <div>
//             <strong>Answers:</strong>
//             <ul>
//               {question.choices.map((choice, index) => (
//                 <li key={index}>{choice.text}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

import * as client from "../client";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function Preview() {
  const { courseId, quizId } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    client
      .fetchQuestions(courseId, quizId)
      .then((receivedQuestions) => {
        setQuestions(receivedQuestions);
      })
      .catch((error) => {
        console.error("Failed to fetch questions:", error);
      });
  }, [courseId, quizId]);
  function renderMultipleChoiceQuestion(question) {
    return (
      <div>
        <label>
          <input type="radio" />1
        </label>
        <br />
        <label>
          <input type="radio" />2
        </label>
        <br />
        <label>
          <input type="radio" />3
        </label>
      </div>
    );
  }

  function renderTrueFalseQuestion(question) {
    return (
      <div>
        <label>
          <input type="radio" />
          True
        </label>
        <br />
        <label>
          <input type="radio" />
          False
        </label>
      </div>
    );
  }

  function renderFillInBlanksQuestion(question) {
    // Assuming the fill-in-the-blanks might have a placeholder or something similar
    return (
      <div>
        <input />
      </div>
    );
  }

  function renderQuestion(question) {
    switch (question.questionType) {
      case "Multiple Choice":
        return renderMultipleChoiceQuestion(question);
      case "True/False":
        return renderTrueFalseQuestion(question);
      case "Fill In Multiple Blanks":
        return renderFillInBlanksQuestion(question);
      default:
        return <div>Unsupported question type</div>;
    }
  }

  return (
    <div>
      <br />
      <h3>{quizId} Preview</h3>

      {/* {questions.map((question, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <div>
            <strong>Type:</strong> {question.questionType}
          </div>
          <div>
            <strong>Question:</strong>
            <span
              style={{ display: "inline-block", marginLeft: "10px" }}
              dangerouslySetInnerHTML={{ __html: question.text }}
            />
          </div>
          <div>
            <strong>Answers:</strong> {renderQuestion(question)}
          </div>
        </div>
      ))} */}

      {questions.map((question, index) => (
        <Card
          bg="light"
          key={index}
          text="dark"
          className="mb-4"
          style={{ width: "500" }} // Adjust the width as needed
        >
          <Card.Header>{question.questionType}</Card.Header>
          <Card.Body>
            <Card.Title dangerouslySetInnerHTML={{ __html: question.text }} />
            <Card.Text>{renderQuestion(question)}</Card.Text>
          </Card.Body>
        </Card>
      ))}
      <form>
        <button className="btn btn-primary float-end">Sumbit</button>
      </form>
    </div>
  );
}
