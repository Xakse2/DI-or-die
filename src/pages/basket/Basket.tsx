import { useAnonymousSession } from '@/hooks/useAnonimToken';
import { useEffect } from 'react';

export function BasketPage() {
  const { token } = useAnonymousSession();

  useEffect(() => {
    if (token) {
      console.log('Anonymous token:', token);
    }
  }, [token]);

  return <h3>Basket</h3>;
}
