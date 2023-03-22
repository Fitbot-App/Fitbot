import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  intensity: "",
  experience: "",
};

export const intensitySlice = createSlice({
  name: "intesnity",
  initialState,
  reducers: {
    setIntensity: (state, action) => {
      state.intensity = action.payload;
    },
    setExperience: (state, action) => {
      state.experience = action.payload;
    },
  },
});

export const { setIntensity, setExperience } = intensitySlice.actions;

export default intensitySlice.reducer;
