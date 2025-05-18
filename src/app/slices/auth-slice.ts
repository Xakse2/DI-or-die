import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: !!localStorage.getItem('authToken') },
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      localStorage.setItem('authToken', action.payload);
    },
    logout: state => {
      state.isAuthenticated = false;
      localStorage.removeItem('authToken');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
