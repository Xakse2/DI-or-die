import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from './slices/token-slice';

export const store = configureStore({
  reducer: {
    tokenSlice: tokenSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
