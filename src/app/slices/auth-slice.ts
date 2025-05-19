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
      action: PayloadAction<{
        authToken: string;
        username: string;
        refreshToken: string;
      }>,
    ) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      storage.setData('authToken', action.payload.authToken);
      storage.setData('refreshToken', action.payload.refreshToken);
      storage.setData('userEmail', action.payload.username);
    },
    logout: state => {
      state.isAuthenticated = false;
      state.username = '';
      storage.removeData('authToken');
      storage.removeData('userEmail');
      storage.removeData('refreshToken');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
