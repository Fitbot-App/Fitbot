import { configureStore } from '@reduxjs/toolkit';
import equipmentReducer from '../slices/equipmentSlice';
import exercisesReducer from '../slices/chosenExercisesSlice';

const store = configureStore({
  reducer: {
    equipment: equipmentReducer,
    exercises: exercisesReducer,
  },
});

export default store;
