// be imported to Kanbas/Courses/index.tsx

import { assignments, enrollments, grades, users } from "../../Database"; // database
import { useParams } from "react-router-dom"; // extract courseId from url path
import { IoMdSettings } from "react-icons/io";
import { CiExport } from "react-icons/ci";
import { TfiFilter } from "react-icons/tfi";
import { CiImport } from "react-icons/ci";

function Grades() {
  const { courseId } = useParams(); // extract courseId from url path
  const as = assignments.filter((assignment) => assignment.course === courseId); // use courseId here
  const es = enrollments.filter((enrollment) => enrollment.course === courseId); // use courseId here

  return (
    <div>
      {/* 1. top button start */}
      <div className="mt-5 mb-5 ">
        <select style={{ color: "red", border: "none" }}>
          <option>Gradebook</option>
        </select>
        <div className="float-end">
          {/* Import Button */}
          <button
            className="btn btn-light"
            style={{ backgroundColor: "lightgray" }}
          >
            <CiImport />
            Import
          </button>
          {/* Export Dropdown */}
          <button
            className="btn btn-light dropdown-toggle"
            style={{ backgroundColor: "lightgray" }}
          >
            <CiExport /> {/* Place the icon before the text */}
            Export
          </button>
          {/* Settings Button */}
          <button
            className="btn btn-light"
            style={{ backgroundColor: "lightgray" }}
          >
            <IoMdSettings />
          </button>
        </div>
      </div>
      {/* 1. top button end */}
      {/* 2 start */}
      <div className="row mb-3">
        <div className="col-md-6">
          <h3>Student Names</h3>
          <div>
            <select
              className="form-select"
              style={{
                backgroundImage:
                  'url("https://img.icons8.com/ios-filled/50/000000/search--v1.png")',
                backgroundPosition: "left 10px center",
                backgroundSize: "16px 16px",
                paddingLeft: "35px", // Adjust padding to avoid text overlapping the icon
                // Ensure the select element covers the wrapper including the pseudo-element or background arrow
                WebkitAppearance: "menulist-button",
                MozAppearance: "menulist-button",
                appearance: "menulist-button",
              }}
            >
              <option>Search Students</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <h3>Assignments Names</h3>
          <div>
            <select
              className="form-select"
              style={{
                backgroundImage:
                  'url("https://img.icons8.com/ios-filled/50/000000/search--v1.png")',
                backgroundPosition: "left 10px center",
                backgroundSize: "16px 16px",
                paddingLeft: "35px", // Adjust padding to avoid text overlapping the icon
                // Ensure the select element covers the wrapper including the pseudo-element or background arrow
                WebkitAppearance: "menulist-button",
                MozAppearance: "menulist-button",
                appearance: "menulist-button",
              }}
            >
              <option>Search Assignments</option>
            </select>
          </div>
        </div>
      </div>
      {/* 2 start */}
      {/* 3 start */}
      <div style={{ paddingTop: "20px" }}>
        <button
          className="btn btn-primary"
          style={{
            color: "black",
            backgroundColor: "lightgray",
            border: "none",
          }}
        >
          <TfiFilter />
          Apply Filter
        </button>
      </div>

      {/* 3 end */}

      {/* 4. grade table start*/}
      <div className="table-responsive" style={{ marginTop: "50px" }}>
        <table
          className="table table-bordered"
          style={{
            textAlign: "center",
            verticalAlign: "middle",
            borderColor: "black",
          }}
        >
          {/* row 1 */}
          <thead>
            <tr>
              <th
                style={{
                  borderWidth: "1px",
                  borderColor: "black",
                  textAlign: "left",
                }}
              >
                Student Name
              </th>
              {as.map((assignment, index) => (
                <th
                  key={index}
                  style={{ borderWidth: "1px", borderColor: "black" }}
                >
                  {assignment.title}
                </th>
              ))}
            </tr>
          </thead>
          {/* rest row */}
          <tbody>
            {es.map((enrollment) => {
              const user = users.find((user) => user._id === enrollment.user);
              return (
                <tr key={enrollment._id}>
                  <td style={{ textAlign: "left" }}>
                    {user?.firstName} {user?.lastName}
                  </td>
                  {as.map((assignment) => {
                    // Make sure to iterate over 'as', not 'assignments'
                    const grade = grades.find(
                      (grade) =>
                        grade.student === enrollment.user &&
                        grade.assignment === assignment._id
                    );
                    return (
                      <td key={assignment._id}>
                        <input
                          defaultValue={grade?.grade || ""}
                          type="number"
                          placeholder="No Grade"
                          style={{
                            width: "100%",
                            border: "none",
                            textAlign: "center",
                          }}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* 4. grade table end*/}
    </div>
  );
}

export default Grades;
