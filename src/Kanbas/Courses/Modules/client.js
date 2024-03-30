import axios from "axios";
// 1
// const COURSES_API = "http://localhost:4000/api/courses";
// const MODULES_API = "http://localhost:4000/api/modules";
// 2
// const COURSES_API =
//   "https://kanbas-node-server-app-pd28.onrender.com/api/courses ";
// const MODULES_API =
//   "https://kanbas-node-server-app-pd28.onrender.com/api/modules ";
// 3
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const MODULES_API = `${API_BASE}/api/modules`;

export const updateModule = async (module) => {
  const response = await axios.put(`${MODULES_API}/${module._id}`, module);
  return response.data;
};

export const deleteModule = async (moduleId) => {
  const response = await axios.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};

export const createModule = async (courseId, module) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const findModulesForCourse = async (courseId) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  console.log(response.data);
  return response.data;
};
