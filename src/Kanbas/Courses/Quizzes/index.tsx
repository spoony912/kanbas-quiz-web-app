import React from "react";
import QuizList from './List';
import { FaGlasses } from "react-icons/fa";

function Quizzes() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Quizzes</h3>
        <button type="button" className="btn btn-secondary btn-rounded" style={{ marginLeft: 'auto' }}>
          <FaGlasses /> Student View</button>
        <hr />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button style={{ width: "100px", marginTop: '10px', marginLeft: 'auto' }} className="btn btn-danger w-10">+ Quiz</button>
      </div>

  

      <QuizList />
    </div>
  );
}
export default Quizzes;