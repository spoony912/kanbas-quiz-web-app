import axios from "axios";

const API_BASE = process.env.REACT_APP_BASE_API_URL;
const COURSES_API = `${API_BASE}/api/courses`;
// const QUIZZES_API = `${API_BASE}/api/quizzes`;
axios.defaults.withCredentials = true;

// app.delete("/api/courses/:cid/quizzes", deleteQuiz);
export const deleteQuiz = async (courseId, quizId) => {
  const response = await axios.delete(
    // `${COURSES_API}/${courseId}/quizzes/quizzes?quizId=${quizId}`
    `${COURSES_API}/${courseId}/quizzes/${quizId}`
  );
  return response.data;
};

// app.put("/api/quizzes/:cid/quizzes/:qid", updateQuiz);
export const updateQuiz = async (courseId, quizId, quiz) => {
  const response = await axios.put(
    `${COURSES_API}/${courseId}/quizzes/${quizId}`,
    quiz
  );
  return response.data;
};

// app.post("/api/courses/:cid/quizzes", createQuiz);
// export const createQuiz = async (courseId, quiz, quizId) => {
//   const response = await axios.post(
//     `${COURSES_API}/${courseId}/quizzes/${quizId}`,
//     quiz
//   );
//   return response.data;
// };

export const createQuiz = async (courseId, quiz) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return response.data;
};

// app.get("/api/courses/:cid/quizzes", findAllQuizzes);
export const findQuizzesForCourse = async (courseId) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

// app.get("/api/courses/:cid/quizzes/:qid", findQuizById);
// export const fetchQuizById = async (courseId, quizId) => {
//   try {
//     const response = await axios.get(
//       `${COURSES_API}/${courseId}/quizzes/${quizId}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching quiz details:", error);
//     throw error;
//   }
// };

export const fetchQuizById = async (courseId, quizId) => {
  if (!quizId) {
    console.error("fetchQuizDetails was called without a quizId.");
    return;
  }
  const response = await axios.get(
    `${COURSES_API}/${courseId}/quizzes/${quizId}`
  );
  return response.data;
};

// app.delete("/api/courses/:cid/quizzes/:qid", deleteQuiz);
export const updateQuizDetails = async (courseId, quizId, quizData) => {
  const response = await axios.put(
    `${COURSES_API}/${courseId}/quizzes/${quizId}`,
    quizData
  );
  return response.data;
};

// app.get("/api/quizzes/type", findQuizzesByType);
// export const findQuizByType = async (quizType,courseId) => {
//   const response = await axios.get(`${COURSES_API}/${courseId}/quizzes/type?quizType=${quizType}`);
//   return response.data;
// };

export const fetchQuestions = async (courseId, quizId) => {
  try {
    const response = await axios.get(
      `${COURSES_API}/${courseId}/quizzes/${quizId}/Questions`
    );
    console.log(response.data);
    return response.data; // Assuming the API returns an array of questions
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const createQuestion = async (courseId, quizId, questionData) => {
  try {
    const response = await axios.post(
      `${COURSES_API}/${courseId}/quizzes/${quizId}/Questions`,
      questionData
    );
    return response.data; // Returns the updated quiz document with the new question added
  } catch (error) {
    console.error("Error creating question:", error);
    throw error; // Rethrow to handle it in the component
  }
};

export const findQuestionByType = async (
  quizQuestionType,
  courseId,
  quizId
) => {
  const response = await axios.get(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/Questions`,
    {
      params: { quizId },
    }
  );
  return response.data;
};
