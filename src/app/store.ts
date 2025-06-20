import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth-slice';
import tokenSlice from './slices/token-slice';
import { clientTokenApi } from './slices/api-get-token';
import { loginApi } from './slices/api-auth';
import { registerApi } from './slices/api-register';
import { userProfileApi } from './slices/api-profile';
import { refreshTokenApi } from './slices/refreshTokenApi';
import { productsApi } from './slices/api-products';
import { anonymousToken } from './slices/api-anonim';
import { basketCreateApi } from './slices/api-basket';

export const store = configureStore({
  reducer: {
    tokenSlice: tokenSlice,
    auth: authSlice,
    [clientTokenApi.reducerPath]: clientTokenApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [userProfileApi.reducerPath]: userProfileApi.reducer,
    [refreshTokenApi.reducerPath]: refreshTokenApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [anonymousToken.reducerPath]: anonymousToken.reducer,
    [basketCreateApi.reducerPath]: basketCreateApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    // eslint-disable-next-line unicorn/prefer-spread
    getDefaultMiddleware().concat(
      clientTokenApi.middleware,
      registerApi.middleware,
      loginApi.middleware,
      userProfileApi.middleware,
      refreshTokenApi.middleware,
      productsApi.middleware,
      anonymousToken.middleware,
      basketCreateApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
