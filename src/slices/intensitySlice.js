import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  intensity: '',
  experience: '',
};

export const intensitySlice = createSlice({
  name: 'intesnity',
  initialState,
  reducers: {
    setIntensity: (state, action) => {
      state.intensity = action.payload;
    },
    setExperience: (state, action) => {
      state.experience = action.payload;
    },
    clearIntensity: (state, action) => {
      state.intensity = '';
      state.experience = '';
    },
  },
});

export const { setIntensity, setExperience, clearIntensity } =
  intensitySlice.actions;

export default intensitySlice.reducer;
