import axios from "axios";
// const COURSES_API = "https://kanbas-node-server-app-xsii.onrender.com/api/courses";
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;

export const fetchAllCourses = async () => {
  const response = await axios.get(COURSES_API);
  return response.data;
};

export const fetchCourseById = async (id?: string) => {
  const response = await axios.get(`${API_BASE}/api/courses/${id}`);
  return response.data;
};

export const createCourse = async (course: any) => {
  const response = await axios.post(
    COURSES_API,
    course
  );
  return response.data;
};

export const deleteCourse = async (id: string) => {
  const response = await axios.delete(
    `${API_BASE}/api/courses/${id}`
  );
  return response.data;
};



export const updateCourse = async (course: any) => {
  const response = await axios.put(
    `${API_BASE}/api/courses/${course._id}`, course
  );
  return response.data;
};