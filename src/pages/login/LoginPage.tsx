import { AuthForm } from '@/components/form/AuthForm';
import type { RegisterPayload } from '@/interfaces/register-payload';
import { useAuth } from '@/hooks/useAuth';

export function LoginPage() {
  const { login } = useAuth();

  const handleLogin = async (data: RegisterPayload) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
}
