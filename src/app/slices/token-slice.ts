import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: { accessToken: '', RefreshToken: '' },
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload || state.accessToken;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.RefreshToken = action.payload || state.RefreshToken;
    },
    clearToken: state => {
      state.accessToken = '';
      state.RefreshToken = '';
    },
  },
});

export const { setToken, setRefreshToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
