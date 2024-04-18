import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";
import quizReducer from "../Courses/Quizzes/quizReducer";

export interface KanbasState {
  modulesReducer: {
    modules: any[]
    module: any
  };
  assignmentsReducer: {
    assignments: any[]
    selectedAssignment: any
  };
  quizReducer:{
    quizzes: any[];
    quiz:any;
  }
}
const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    quizReducer,
  }
});


export default store;