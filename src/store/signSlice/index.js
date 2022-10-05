import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const signSlice = createSlice({
  name: 'sign',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state, action) => {
      state.user = null;
    },
  },
});

export const { setUser, signOut } = signSlice.actions;

export default signSlice.reducer;
