import { AuthForm } from '@/components/form/AuthForm';
import { authService } from '@/service/authService';
import { useNavigate } from 'react-router-dom';
import type { RegisterPayload } from '@/interfaces/register-payload';

export function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (data: RegisterPayload) => {
    try {
      await authService.login(data.email, data.password, navigate);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
}
