import {
  useCheckActiveBasketQuery,
  useGetNewBasketMutation,
} from '@/app/slices/api-basket';

import { storage } from '@/service/local-storage';
// import { useEffect } from 'react';

export function useCreateBasket() {
  const [createBasket] = useGetNewBasketMutation();
  // const [loading, setLoading] = useState(false);
  // const [token, setToken] = useState<string>('');

  // useEffect(() => {
  // const token =
  //   storage.getData('authToken') ?? storage.getData('anonymousToken');
  //   if (savedToken && savedToken.length > 0) {
  //     setToken(savedToken);
  //   }
  // }, []);
  const {
    data: activeCart,
    // refetch,
    error,
    isLoading,
    isUninitialized,
  } = useCheckActiveBasketQuery(undefined, {
    skip:
      storage.getData('authToken') === null &&
      storage.getData('anonymousToken') === null,
  });

  const getCreateBasket = async () => {
    // setLoading(true);

    if (isLoading || isUninitialized) {
      console.log('Waiting for activeCart...');
      return;
    }

    console.log('active basket:', activeCart);
    if (!activeCart) {
      console.log('No active cart exists, creating a new one...');
      try {
        const basketResponse = await createBasket({
          currency: 'EUR',
        }).unwrap();
        console.log('New basket:', basketResponse);
      } catch (error) {
        console.error('Error get new basket:', error);
      }
    }
    // setLoading(false);
  };

  return { getCreateBasket, activeCart, error };
}
