import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;

export const deleteQuiz = async (quizId) => {
  const response = await axios
    .delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};


export const updateQuiz = async (quiz) => {
  const response = await axios.
    put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};


export const createQuiz = async (courseId, quiz) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/quizzes`,quiz);
  return response.data;
};

export const findQuizzesForCourse = async (courseId) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

// for quiz details editor
export const fetchQuizById = async (courseId, quizId) => {
  try {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz details:', error);
    throw error;
  }
};

// for quiz details editor
export const updateQuizDetails = async (courseId, quizId, quizData) => {
  const response = await axios.put(`${COURSES_API}/${courseId}/quizzes/${quizId}`, quizData);
  return response.data;
 };