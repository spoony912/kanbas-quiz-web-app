import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [],
  assignment: { name: "New Assignment", description: "New Description" },
};

const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },

    addAssignment: (state, action) => {
      const newAssignment = {
        ...action.payload,
        _id: new Date().getTime().toString(),
      };
      state.assignments = [newAssignment, ...state.assignments];
    },

    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },

    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === action.payload._id ? action.payload : assignment
      );
    },
    selectAssignment: (state, action) => {
      state.assignment = action.payload;
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
  selectAssignment,
} = assignmentSlice.actions;
export default assignmentSlice.reducer;
