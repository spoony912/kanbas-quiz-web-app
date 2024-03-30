import React, { useEffect, useState } from "react";
import axios from "axios";
function WorkingWithObjects() {
  // assignment
  const assignmentURL = "http://localhost:4000/a5/assignment";
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const fetchAssignment = async () => {
    const response = await axios.get(`${assignmentURL}`);
    setAssignment(response.data);
  };
  const updateTitle = async () => {
    const response = await axios.get(
      `${assignmentURL}/title/${assignment.title}`
    );
    setAssignment(response.data);
  };
  useEffect(() => {
    fetchAssignment();
  }, []);

  // module
  const [module, setModule] = useState({
    id: "",
    name: "New Name",
    description: "New Description",
    course: "New Course",
  });
  const moduleURL = "http://localhost:4000/a5/module";

  return (
    <div>
      <br />
      <br />
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      {/* assignment */}
      <a href="http://localhost:4000/a5/assignment" className="btn btn-primary">
        Get Assignment
      </a>
      <h4>Retrieving Properties</h4>
      <a
        href="http://localhost:4000/a5/assignment/title"
        className="btn btn-primary"
      >
        Get Title
      </a>
      <h4>Modifying Properties</h4>
      <input
        className="form-control"
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
        value={assignment.title}
        type="text"
      />
      <button onClick={updateTitle}>
        Update Title to : {assignment.title}
      </button>
      <button onClick={fetchAssignment}>Fetch Assignment</button>
      {/* old */}
      <a
        className="btn btn-primary"
        href={`${assignmentURL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <input
        className="form-control"
        type="text"
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
        value={assignment.title}
      />
      <a
        className="btn btn-primary"
        href={`${assignmentURL}/score/${assignment.score}`}
      >
        Update Score
      </a>
      <input
        className="form-control"
        type="number"
        onChange={(e) =>
          setAssignment({
            ...assignment,
            score: parseInt(e.target.value, 10),
          })
        }
        value={assignment.score}
      />
      <a
        className="btn btn-primary"
        href={`${assignmentURL}/completed/${assignment.completed}`}
      >
        Update Status
      </a>
      <input
        className="form-check-input"
        type="checkbox"
        onChange={(e) =>
          setAssignment({
            ...assignment,
            completed: e.target.checked,
          })
        }
        checked={assignment.completed}
      />
      <br /> <br /> <br /> <br />
      {/* module */}
      <a href="http://localhost:4000/a5/module" className="btn btn-primary">
        Get Module
      </a>
      <h4>Retrieving Properties</h4>
      <a
        href="http://localhost:4000/a5/module/name"
        className="btn btn-primary"
      >
        Get Name
      </a>
      <h4>Modifying Properties</h4>
      <a className="btn btn-primary" href={`${moduleURL}/name/${module.name}`}>
        Update Name
      </a>
      <input
        className="form-control"
        type="text"
        onChange={(e) => setModule({ ...module, name: e.target.value })}
        value={module.name}
      />
      <a
        className="btn btn-primary"
        href={`${moduleURL}/description/${module.description}`}
      >
        Update Description
      </a>
      <input
        className="form-control"
        type="text"
        onChange={(e) => setModule({ ...module, description: e.target.value })}
        value={module.description}
      />
    </div>
  );
}

export default WorkingWithObjects;
