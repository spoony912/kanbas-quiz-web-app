import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  assignments: [],
  assignment:{name:"New Assignment", description:"New Description"},
}; 

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {

    setAssignments: (state, action)=>{
      state.assignments = action.payload;
    },

    addAssignment: (state, action) => {
      state.assignments.push(action.payload);
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
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;