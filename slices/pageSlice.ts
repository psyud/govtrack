import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'wallet',
  initialState: {
    isSignUp: false,
    isSignIn: false
  },
  reducers: {
    signIn: (state) => {
        state.isSignIn = true;
    },
    signUp: (state) => {
        state.isSignUp = true;
    },
    resetPage: state => {
        state.isSignIn = false;
        state.isSignUp = false;
    }
  },
});

export const { signIn, signUp, resetPage } = slice.actions;

export const selectPage = state => state.page;

export default slice.reducer;
