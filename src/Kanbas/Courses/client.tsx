import axios from "axios";

// const API_BASE = process.env.REACT_APP_API_BASE;
// const COURSES_API = `${API_BASE}/api/courses`;
const BASE_API = process.env.REACT_APP_BASE_API_URL;
const COURSES_API = `${BASE_API}/api/courses`;

export const fetchALLCourses = async () => {
  // const response = await axios.get("http://localhost:4000/api/courses");
  const response = await axios.get(COURSES_API);
  return response.data;
};

export const fetchCourseById = async (id?: string) => {
  // const response = await axios.get(`http://localhost:4000/api/courses/${id}`);
  const response = await axios.get(`${BASE_API}/api/courses/${id}`);
  return response.data;
};
