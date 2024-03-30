import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;

export const fetchALLCourses = async () => {
  // const response = await axios.get("http://localhost:4000/api/courses");
  const response = await axios.get(COURSES_API);

  return response.data;
};

export const fetchCourseById = async (id?: string) => {
  // const response = await axios.get(`http://localhost:4000/api/courses/${id}`);
  const response = await axios.get(`${API_BASE}/api/courses/${id}`);

  return response.data;
};
