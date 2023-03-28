import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const userSlice = createSlice({
  name: 'loggedInUser',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    removeUser: (state) => {
      state.loggedInUser = {};
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
