import { createSlice } from '@reduxjs/toolkit';

// Data structure for this slice's state
const initialState = {
  equipment: [],
};

// Redux state (store) slice
export const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    setEquipment: (state, action) => {
      state.equipment = [...state.equipment, ...action.payload];
    },
  },
});

// Action creators
export const { setEquipment } = equipmentSlice.actions;

// Reducer
export default equipmentSlice.reducer;
