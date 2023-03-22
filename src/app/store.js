import { configureStore } from '@reduxjs/toolkit';
import equipmentReducer from '../slices/equipmentSlice';
import exercisesReducer from '../slices/chosenExercisesSlice';
import intensityReducer from "../slices/intensitySlice";

const store = configureStore({
  reducer: {
    equipment: equipmentReducer,
    exercises: exercisesReducer,
    intensity: intensityReducer,
  },
});

export default store;
