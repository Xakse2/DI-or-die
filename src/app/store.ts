import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from './slices/tokenSlice';

export const store = configureStore({
  reducer: {
    tokenSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
