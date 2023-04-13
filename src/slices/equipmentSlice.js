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
      state.equipment.push(action.payload);
    },
    setAllEquipment: (state, action) => {
      state.equipment = action.payload;
    },
    removeEquipment: (state, action) => {
      state.equipment = state.equipment.filter((item) => {
        return action.payload !== item;
      });
    },
    clearEquipment: (state, action) => {
      state.equipment = [];
    },
  },
});

// Action creators
export const {
  setEquipment,
  removeEquipment,
  clearEquipment,
  setAllEquipment,
} = equipmentSlice.actions;

// Reducer
export default equipmentSlice.reducer;
