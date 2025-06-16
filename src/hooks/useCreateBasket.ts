import {
  useCheckActiveBasketQuery,
  useGetNewBasketMutation,
} from '@/app/slices/api-basket';
import { storage } from '@/service/local-storage';

export function useCreateBasket() {
  const [createBasket] = useGetNewBasketMutation();
  const {
    data: activeCart,
    error,
    isLoading,
    isUninitialized,
  } = useCheckActiveBasketQuery(undefined, {
    skip:
      storage.getData('authToken') === null &&
      storage.getData('anonymousToken') === null,
  });

  const getCreateBasket = async () => {
    if (isLoading || isUninitialized) {
      console.log('Waiting for activeCart...');
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    console.log('active basket:', activeCart);
    if (!activeCart || (error && 'status' in error && error.status === 404)) {
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
  };

  return { getCreateBasket, activeCart, error };
}
