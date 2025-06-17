import { setToken, clearToken } from '@/app/slices/token-slice';
import {
  login as loginAction,
  logout as logoutAction,
} from '@/app/slices/auth-slice';
import { useLoginUserMutation } from '@/app/slices/api-auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const authToken = await loginUser({ username: email, password }).unwrap();
      dispatch(setToken(authToken.access_token));
      dispatch(
        loginAction({
          authToken: authToken.access_token,
          username: email,
          refreshToken: authToken.refresh_token,
        }),
      );
      void navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    dispatch(clearToken());
    dispatch(logoutAction());
  };

  return { login, logout };
};
