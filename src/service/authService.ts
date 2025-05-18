import { loginUser } from '@/api/auth';
import { setToken, clearToken } from '@/app/slices/token-slice';
import { login, logout } from '@/app/slices/auth-slice';
import { store } from '@/app/store';
import type { NavigateFunction } from 'react-router-dom';

export const authService = {
  login: async (
    email: string,
    password: string,
    navigate: NavigateFunction,
  ) => {
    try {
      const authToken = await loginUser(email, password);

      store.dispatch(setToken(authToken));
      store.dispatch(login({ token: authToken, username: email }));
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
};
