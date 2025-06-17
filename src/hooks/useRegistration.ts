import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '@/app/slices/token-slice';
import { login } from '@/app/slices/auth-slice';
import { useRegisterUserMutation } from '@/app/slices/api-register';
import { useGetClientTokenMutation } from '@/app/slices/api-get-token';
import { useLoginUserMutation } from '@/app/slices/api-auth';
import type { FormFields } from '@/pages/registration/RegistrationPage';

export function useRegisterUser() {
  const [registerApi] = useRegisterUserMutation();
  const [getClientToken] = useGetClientTokenMutation();
  const [loginApi] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function registerUser(formData: FormFields): Promise<void> {
    try {
      const clientToken = await getClientToken().unwrap();
      await registerApi({
        payload: {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
        token: clientToken.access_token,
      }).unwrap();

      const authToken = await loginApi({
        username: formData.email,
        password: formData.password,
      }).unwrap();

      dispatch(setToken(authToken.access_token));
      dispatch(
        login({
          authToken: authToken.access_token,
          username: formData.email,
          refreshToken: '',
        }),
      );

      void navigate('/', { replace: true });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  return { registerUser };
}
