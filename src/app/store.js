import { configureStore } from "@reduxjs/toolkit";
import equipmentReducer from "../slices/equipmentSlice";
import intensityReducer from "../slices/intensitySlice";

const store = configureStore({
  reducer: {
    equipment: equipmentReducer,
    intensity: intensityReducer,
  },
});

export default store;
