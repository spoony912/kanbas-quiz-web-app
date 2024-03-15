// 2: store for Kanbas
import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";
// export interface
export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
  assignmentsReducer: {
    assignments: any[];
    assignment: any;
  };
}
const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
  },
});

export default store;
