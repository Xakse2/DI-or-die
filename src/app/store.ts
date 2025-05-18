import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth-slice';
import tokenSlice from './slices/token-slice';
import authSlice from './slices/auth-slice';

export const store = configureStore({
  reducer: {
    tokenSlice: tokenSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
