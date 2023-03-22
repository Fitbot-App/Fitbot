import { createSlice } from '@reduxjs/toolkit';

// Data structure for this slice's state
const initialState = {
  excercises: [],
};

// Redux state (store) slice
export const excercisesSlice = createSlice({
  name: 'excercises',
  initialState,
  reducers: {
    setExcercises: (state, action) => {
      state.excercises = [...state.excercises, action.payload];
    },
    removeExcercise: (state, action) => {
      state.excercises = state.excercises.filter((excercise) => {
        return action.payload !== excercise;
      });
    },
  },
});

// Action creators
export const { setExcercises, removeExcercise } = excercisesSlice.actions;

// Reducer
export default excercisesSlice.reducer;
