import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
  quiz: { title: "New Quiz" },
};

const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action) => {
      const newQuiz = {
        ...action.payload,
        _id: new Date().getTime().toString(),
      };
      state.quizzes = [newQuiz, ...state.quizzes];
    },

    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (eachQuiz) => eachQuiz._id !== action.payload
      );
    },

    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((eachQuiz) =>
        eachQuiz._id === action.payload._id ? action.payload : eachQuiz
      );
    },

    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },

    // is published
    // togglePublishQuiz: (state, action) => {
    //   state.quizzes = state.quizzes.map((quiz) =>
    //     quiz._id === action.payload
    //       ? { ...quiz, isPublished: !quiz.isPublished }
    //       : quiz
    //   );
    // },
    togglePublishQuiz: (state, action) => {
      const updatedQuizzes = state.quizzes.map((quiz) =>
        quiz._id === action.payload
          ? { ...quiz, isPublished: !quiz.isPublished }
          : quiz
      );
      console.log(updatedQuizzes); // Check the updated quizzes array
      state.quizzes = updatedQuizzes;
    },
  },
});

export const {
  setQuizzes,
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  togglePublishQuiz,
} = quizSlice.actions;
export default quizSlice.reducer;
