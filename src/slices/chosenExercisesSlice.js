import { createSlice } from '@reduxjs/toolkit';

// Data structure for this slice's state
const initialState = {
  exercises: [],
};

// Redux state (store) slice
export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    setExercises: (state, action) => {
      state.exercises = [...state.exercises, action.payload];
    },
    removeExercise: (state, action) => {
      state.exercises = state.exercises.filter((exercise) => {
        return action.payload !== exercise;
      });
    },
  },
});

// Action creators
export const { setExercises, removeExercise } = exercisesSlice.actions;

// Reducer
export default exercisesSlice.reducer;
