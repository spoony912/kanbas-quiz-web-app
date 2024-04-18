import { createSlice } from "@reduxjs/toolkit";

// interface Quiz {
//   name: string;
//   description: string;
//   _id?: string;
//   course: string; 
//   lessons: [];
// };

// const initialState = {
//   quiz: { name: "New Quiz", description: "New Description" },
//   quizzes: [] as Quiz[],
// };

const initialState = {
  quizzes: [],
  quiz: { name: "New Quiz", description: "New Description" },
};




const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },



    addQuiz: (state, action) => {
      state.quizzes.push(action.payload);
    },

    // addQuiz: (state, action) => {
    //   state.quizzes = [
    //     { ...action.payload, _id: new Date().getTime().toString() },
    //       ...state.quizzes,
    //   ];
    // },


    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
    },


    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz._id === action.payload._id) {
          return action.payload;
        } else {
          return quiz;
        }
      });
    },
    
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
  },
});


export const { addQuiz, deleteQuiz,
  updateQuiz, setQuiz, setQuizzes} = quizzesSlice.actions;
export default quizzesSlice.reducer;
