// imported to src/Kanbas/Courses/Modules/index.tsx
//-----------------------------------------------------------------------------//
import React, { useState, useEffect } from "react";
import "./index.css"; // own css
// import { modules } from "../../Database"; // database
// import * as db from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa"; // fontawesome
import { useParams } from "react-router"; // extract courseId
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules,
} from "./modulesReducer";
// import { KanbasState } from "../../store";
import * as client from "./client";
//-----------------------------------------------------------------------------//
function ModuleList() {
  const { courseId } = useParams();
  useEffect(() => {
    client
      .findModulesForCourse(courseId)
      .then((modules) => dispatch(setModules(modules)));
  }, [courseId]);

  // add module
  const handleAddModule = () => {
    client.createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };

  // delete module
  const handleDeleteModule = (moduleId) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };

  // update
  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };

  const modules = useSelector((state) => state.modulesReducer.modules);
  const module = useSelector((state) => state.modulesReducer.module);
  const dispatch = useDispatch();

  return (
    <>
      {/* Implement buttons Collapse All, View Progress, etc. here  */}
      {/* -------------------------------------------------------------------- */}
      <div className="button-container" style={{ paddingBottom: "10px" }}>
        <div className="mt-3  button-group">
          <button>Collapse All</button>
          <button>View Progress</button>
          <select>
            <option value="VAL1"> ✔ Publish All</option>
          </select>

          <button className="btn-module">+ Module</button>
          <button>
            <BsThreeDotsVertical />
          </button>
        </div>
      </div>
      {/* -------------------------------------------------------------------- */}
      <hr />

      <ul className="list-group wd-modules mt-5">
        {/* after import reducer */}
        <li className="list-group-item">
          <input
            className="form-control mb-2 mt-2"
            value={module.name}
            onChange={(e) =>
              dispatch(setModule({ ...module, name: e.target.value }))
            }
          />
          <textarea
            className="form-control"
            value={module.description}
            onChange={(e) =>
              dispatch(setModule({ ...module, description: e.target.value }))
            }
          />
          <button
            className="btn btn-primary mt-2 mb-2"
            onClick={handleAddModule}
          >
            Add
          </button>
          <button className="btn btn-success" onClick={handleUpdateModule}>
            Update
          </button>
        </li>

        {modules
          .filter((module) => module.course === courseId) // new list
          .map((module, index) => (
            <li key={index} className="list-group-item">
              <button
                className="btn btn-success"
                onClick={(event) => dispatch(setModule(module))}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteModule(module._id)}
              >
                Delete
              </button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <FaEllipsisV className="me-2" /> {module.name}
                  <p style={{ marginBottom: 0 }}>{module.description}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      display: "inline-block",
                      borderRadius: "10%",
                      border: "2px solid gray",
                      verticalAlign: "middle",
                      marginRight: "8px",
                    }}
                  >
                    40% of total
                  </div>
                  <FaCheckCircle className="text-success" />
                  <FaPlusCircle className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </div>
              </div>
              {/* lesson name */}
              {module.lessons && (
                <ul className="list-group">
                  {module.lessons.map((lesson, index) => (
                    <li key={index} className="list-group-item">
                      <FaEllipsisV className="me-2" />
                      {lesson.name}
                      <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2" />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </>
  );
}
export default ModuleList;
