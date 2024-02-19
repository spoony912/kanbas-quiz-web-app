//-----------------------------------------------------------------------------//
import { courses } from "../../Kanbas/Database"; // courses database
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router-dom";

// Courses/Modules
import Modules from "./Modules";
// Courses/Home
import Home from "./Home";
// Courses/Assigment
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
// grade
import Grades from "./Grades";
//-----------------------------------------------------------------------------//
function Courses() {
  const { courseId } = useParams(); // extract courseID from URL path
  const course = courses.find((course) => course._id === courseId); // use courseId here
  const location = useLocation(); // breadcrumb: Use useLocation hook to get the current location

  // Extract the current page from the URL
  const currentPage = location.pathname.split("/").pop() || ""; // This gets the last segment of the URL path

  // Optionally, you might want to capitalize or format currentPage
  const formattedPage = currentPage.charAt(0).toUpperCase() + currentPage.slice(1); // Capitalize the first letter
  return (
    <div>
      {/* 三 on top */}
      <h3
        style={{
          borderBottom: "1px solid black",
          paddingBottom: "10px",
          paddingTop: "10px",
        }}
      >
        <HiMiniBars3 style={{ marginRight: "30px", marginLeft: "30px" }} />
        {course?.number} {course?.name} {">"} {formattedPage}
      </h3>

      {/* Home, Module ... */}
      <CourseNavigation />

      {/* next to  Home, Module ... */}
      <div>
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{ left: "320px", top: "50px" }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:assignmentId"
              element={<AssignmentEditor />}
            />
            <Route path="Assignments" element={<h1>Assignment Editor</h1>} />
            <Route path="Grades" element={<Grades />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default Courses;