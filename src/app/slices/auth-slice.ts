import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: !!localStorage.getItem('accessToken') },
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', action.payload);
    },
    logout: state => {
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
