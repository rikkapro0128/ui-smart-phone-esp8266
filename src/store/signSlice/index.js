import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  type: 'local',
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
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { setUser, signOut, setType } = signSlice.actions;

export default signSlice.reducer;
