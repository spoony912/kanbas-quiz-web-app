import axios from "axios";

// const COURSES_API = "http://localhost:4000/api/courses";
// const API_BASE = process.env.REACT_APP_API_BASE;
const API_BASE = process.env.REACT_APP_BASE_API_URL;
const COURSES_API = `${API_BASE}/api/courses`;
// const ASSIGNMENT_API = "http://localhost:4000/api/assignments";
const ASSIGNMENT_API = `${API_BASE}/api/assignments`;


export const deleteAssignment = async (courseId, assignmentId) => {
  const response = await axios.delete(
    `${COURSES_API}/${courseId}/assignments/`
  );
  return response.data;
};


export const findAssignmentsForCourse = async (courseId) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const createAssignment = async (courseId, assignmentDetails) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignmentDetails
  );
  return response.data;
};

export const updateAssignment = async (assignmentDetails) => {
  // Assuming your server expects the courseId as part of the URL
  const response = await axios.put(
    `${COURSES_API}/${assignmentDetails.course}/assignments/${assignmentDetails._id}`,
    assignmentDetails
  );
  return response.data;
};
