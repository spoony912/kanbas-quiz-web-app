// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// interface Module {
//   _id: string;
//   name: string;
//   description: string;
//   // Add any additional properties relevant to a Module
// }

// interface ModuleState {
//   modules: Module[];
//   module: Module | {}; // Adjusted to include the single module state
// }

// const initialState = {
//   modules: [],
//   module: { name: "New Module 123", description: "New Description" },
// };

// const modulesSlice = createSlice({
//   name: "modules",
//   initialState,
//   reducers: {
//     setModules: (state, action) => {
//       state.modules = action.payload;
//     },
//     addModule: (state, action) => {
//       state.modules = [
//         { ...action.payload, _id: new Date().getTime().toString() },
//         ...state.modules,
//       ];
//     },
//     deleteModule: (state, action) => {
//       state.modules = state.modules.filter(
//         (module) => module._id !== action.payload
//       );
//     },
//     updateModule: (state, action) => {
//       state.modules = state.modules.map((module) => {
//         if (module._id === action.payload._id) {
//           return action.payload;
//         } else {
//           return module;
//         }
//       });
//     },
//     setModule: (state, action) => {
//       state.module = action.payload;
//     },
//   },
// });

// export const { addModule, deleteModule, updateModule, setModule, setModules } =
//   modulesSlice.actions;
// export default modulesSlice.reducer;
// Assuming you have a more detailed Module interface elsewhere, include all necessary properties here

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modules: [],
  module: { name: "New Module 123", description: "New Description" },
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    addModule: (state, action) => {
      const newModule = {
        ...action.payload,
        _id: new Date().getTime().toString(),
      };
      state.modules = [newModule, ...state.modules];
    },
    deleteModule: (state, action) => {
      state.modules = state.modules.filter(
        (module) => module._id !== action.payload
      );
    },
    updateModule: (state, action) => {
      state.modules = state.modules.map((module) =>
        module._id === action.payload._id ? action.payload : module
      );
    },
    setModule: (state, action) => {
      state.module = action.payload;
    },
  },
});

export const { addModule, deleteModule, updateModule, setModule, setModules } =
  modulesSlice.actions;
export default modulesSlice.reducer;
