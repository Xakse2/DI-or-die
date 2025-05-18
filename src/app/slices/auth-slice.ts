import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { storage } from '@/service/local-storage';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!storage.getData('authToken'),
    username: storage.getData('userEmail') ?? '',
  },
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; username: string }>,
    ) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      storage.setData('authToken', action.payload.token);
      storage.setData('userEmail', action.payload.username);
    },
    logout: state => {
      state.isAuthenticated = false;
      state.username = '';
      storage.removeData('authToken');
      storage.removeData('userEmail');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

// localStorage.getItem('authToken')
