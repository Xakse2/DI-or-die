import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: { accessToken: '' },
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload || state.accessToken;
    },
    clearToken: state => {
      state.accessToken = '';
    },
  },
});

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
