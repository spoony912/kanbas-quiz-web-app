import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../Database";

// Assuming db.quizzes is the correct source and it has the correct format
const initialState = {
  quizzes: db.quizFake, // Initial quizzes loaded from database
  quiz: { title: "New Quiz" }, // Initial default quiz state
};

const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      const newQuiz = {
        ...action.payload,
        _id: new Date().getTime().toString(), // Generates a unique string ID
      };
      state.quizzes.push(newQuiz);
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (eachQuiz: any) => eachQuiz._id !== action.payload
      );
    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((eachQuiz: any) => {
        if (eachQuiz._id === action.payload._id) {
          return action.payload;
        } else {
          return eachQuiz;
        }
      });
    },
    selectQuiz: (state, action) => {
      state.quiz = action.payload; // Selects a quiz to be the active one
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, selectQuiz } =
  quizSlice.actions;
export default quizSlice.reducer;
