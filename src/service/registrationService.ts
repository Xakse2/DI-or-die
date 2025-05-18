import type { NavigateFunction } from 'react-router-dom';
import type { AppDispatch } from '@/app/store';
import { setToken } from '@/app/slices/token-slice';
import { registerUser as apiRegisterUser } from '@/api/register';
import { loginUser as apiLoginUser } from '@/api/auth';
import type { FormFields } from '@/pages/registration/RegistrationPage';
import { getClientCredentialsToken } from '@/api/get-token';
import { login } from '@/app/slices/auth-slice';

export async function registerUser(
  formData: FormFields,
  navigate: NavigateFunction,
  dispatch: AppDispatch,
): Promise<void> {
  try {
    const clientToken = await getClientCredentialsToken();

    await apiRegisterUser(
      {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
      clientToken,
    );

    const authToken = await apiLoginUser(formData.email, formData.password);

    dispatch(setToken(authToken));
    dispatch(login({ token: authToken, username: formData.email }));

    await navigate('/', { replace: true });
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
}
