import { useAnonymousToken } from '@/hooks/useAnonymousToken';
import { useCreateBasket } from '@/hooks/useCreateBasket';
import { useEffect, useState } from 'react';

export function BasketPage() {
  const { getToken } = useAnonymousToken();
  const { getCreateBasket, activeCart, error } = useCreateBasket();
  const [activeToken, setToken] = useState<string>('');

  useEffect(() => {
    const fetchTokenAndCreateBasket = async () => {
      const newToken = await getToken();
      if (newToken) {
        setToken(newToken);
      }
    };

    void fetchTokenAndCreateBasket();
  }, []);

  useEffect(() => {
    console.log('activeCart:', activeCart);
    if (
      activeToken.length > 0 &&
      error &&
      typeof error === 'object' &&
      'status' in error &&
      error.status === 404
    ) {
      void getCreateBasket();
    }
  }, [error]);

  return <h3>Basket</h3>;
}
