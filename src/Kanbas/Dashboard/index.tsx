import React, { useState, useEffect } from "react"; // React import
import { Link } from "react-router-dom"; // Link for routing
import courseImage from "./reactjs.jpg"; // Import image
import "./index.css"; // Import CSS
import * as client from "../Courses/client";
// -------- interface
interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image?: string; // Assuming image is optional
}

interface DashboardProps {
  courses: Course[];
  course: Course;
  setCourse: (course: Course) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}
function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: DashboardProps) {
  // new
  const [coursesUseState, setCoursesUseState] = useState<any[]>([]);
  const findAllCourses = async () => {
    const courses = await client.fetchALLCourses();
    setCoursesUseState(courses);
  };
  useEffect(() => {
    findAllCourses();
  }, []);
  return (
    <div className="p-4">
      <h1>Dashboard</h1>
      <h5>Course</h5>
      <input
        value={course.name}
        className="form-control mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <input
        value={course.number}
        className="form-control mb-2"
        onChange={(e) => setCourse({ ...course, number: e.target.value })}
      />
      <input
        value={course.startDate}
        className="form-control mb-2"
        type="date"
        onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
      />
      <input
        value={course.endDate}
        className="form-control mb-2"
        type="date"
        onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
      />

      <button className="btn btn-success me-2" onClick={addNewCourse}>
        Add
      </button>
      <button className="btn btn-primary" onClick={updateCourse}>
        Update
      </button>

      <hr />

      <h2>Published Courses({courses.length})</h2>
      <hr />

      <div className="row">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-5">
          {courses.map((course) => (
            <div
              key={course._id}
              className="col custom-card-spacing"
              style={{ width: "300px" }}
            >
              <div className="card">
                <img
                  src={courseImage}
                  className="card-img-top"
                  alt={`Cover for ${course.name}`}
                  style={{ height: 150 }}
                />

                <div className="card-body">
                  <Link
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    className="card-title"
                    style={{
                      textDecoration: "none",
                      color: "navy",
                      fontWeight: "bold",
                    }}
                  >
                    <button
                      className="btn btn-info me-2"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger me-2"
                      onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);
                      }}
                    >
                      Delete
                    </button>
                    {course._id}
                  </Link>
                  <p className="card-text">{course.name}</p>
                  <Link
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    className="btn btn-primary"
                  >
                    Go
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
