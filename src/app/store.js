import { configureStore } from '@reduxjs/toolkit';
import equipmentReducer from '../slices/equipmentSlice';
import excercisesReducer from '../slices/chosenExcercisesSlice';

const store = configureStore({
  reducer: {
    equipment: equipmentReducer,
    excercises: excercisesReducer,
  },
});

export default store;
