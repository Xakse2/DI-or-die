import { loginUser } from '@/api/auth';
import { setToken, clearToken } from '@/app/slices/token-slice';
import { login, logout } from '@/app/slices/auth-slice';
import { store } from '@/app/store';
import type { NavigateFunction } from 'react-router-dom';
// import { getClientCredentialsToken } from '@/api/get-token';

export const authService = {
  login: async (
    email: string,
    password: string,
    navigate: NavigateFunction,
  ) => {
    console.log('Sending request to API:', { email, password });
    try {
      // const clientToken = await getClientCredentialsToken();
      const accessToken = await loginUser(email, password);

      store.dispatch(setToken(accessToken));
      store.dispatch(login(accessToken));
      void navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid credentials');
    }
  },

  logout: () => {
    store.dispatch(clearToken());
    store.dispatch(logout());
  },

  getToken: (): string | null => {
    return store.getState().tokenSlice.accessToken;
  },

  isAuthenticated: (): boolean => {
    return store.getState().auth.isAuthenticated;
  },
};
