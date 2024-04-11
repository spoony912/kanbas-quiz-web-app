// 3: provider
// import Nav from "../Nav";
// 最左边的-----------------------------------------------------------------------------//
import KanbasNavigation from "./Navigation";
import Account from "./Account";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
// import db from "./Database";
// import * as db from "./Database";
import { useState, useEffect } from "react";
//----------------------------------------------------
// 3: provider
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";
// ----- interface
interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image?: string; // image is optional
}
// const API_BASE = process.env.REACT_APP_API_BASE;
// const BASE_API = process.env.REACT_APP_BASE_API_URL;

function Kanbas() {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    height: "100vh",
    flexDirection: "row",
  };

  // move all states from Dashboard to Kanbas
  // const [courses, setCourses] = useState<Course[]>(db.courses);
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<Course>({
    _id: "RS101",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
  });
  // 1
  // const COURSES_API = "http://localhost:4000/api/courses";
  // 2
  // const COURSES_API =
  //   "https://kanbas-node-server-app-pd28.onrender.com/api/courses ";
  // 3
  // const BASE_API = process.env.REACT_APP_API_BASE;
  const BASE_API = process.env.REACT_APP_BASE_API_URL;
  const COURSES_API = `${BASE_API}/api/courses`;
  const findAllCourses = async () => {
    const response = await axios.get(COURSES_API);
    setCourses(response.data);
  };
  useEffect(() => {
    findAllCourses();
  }, []);

  // new addNewCourse
  const addNewCourse = async () => {
    const response = await axios.post(COURSES_API, course);
    setCourses([...courses, response.data]);
  };

  // new deleteCourse
  const deleteCourse = async (courseId: string) => {
    const response = await axios.delete(`${COURSES_API}/${courseId}`);
    setCourses(courses.filter((c) => c._id !== courseId));
  };

  // new updateCourse
  const updateCourse = async () => {
    const response = await axios.put(`${COURSES_API}/${course._id}`, course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  return (
    // <div className="d-flex" style={containerStyle}>
    <Provider store={store}>
      <div className="d-flex" style={containerStyle}>
        <KanbasNavigation />

        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/Account/*" element={<Account />} />
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route
              path="Dashboard"
              element={
                <Dashboard
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={addNewCourse}
                  deleteCourse={deleteCourse}
                  updateCourse={updateCourse}
                />
              }
            />
            <Route
              path="Courses/:courseId/*"
              element={<Courses courses={courses} />}
            />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}
export default Kanbas;
