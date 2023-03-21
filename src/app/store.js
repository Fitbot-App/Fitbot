import { configureStore } from '@reduxjs/toolkit';
import equipmentReducer from '../slices/equipmentSlice';

const store = configureStore({
  reducer: {
    equipment: equipmentReducer,
  },
});

export default store;
