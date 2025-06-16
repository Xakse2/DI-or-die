import {
  useCheckActiveBasketQuery,
  useGetNewBasketMutation,
} from '@/app/slices/api-basket';
import type { Cart } from '@/interfaces/cartResponse';
import { storage } from '@/service/local-storage';

export function useCreateBasket() {
  const [createBasket] = useGetNewBasketMutation();
  const {
    data: activeCart,
    error,
    isLoading,
    isUninitialized,
    // refetch,
  } = useCheckActiveBasketQuery(undefined, {
    skip:
      storage.getData('authToken') === null &&
      storage.getData('anonymousToken') === null,
  });

  const getCreateBasket = async (): Promise<Cart | undefined> => {
    if (isLoading || isUninitialized) {
      console.log('Waiting for activeCart...');
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    if (activeCart) {
      return activeCart;
    }
    console.log('active basket:', activeCart);
    if (!activeCart || (error && 'status' in error && error.status === 404)) {
      console.log('No active cart exists, creating a new one...');
      try {
        const basketResponse = await createBasket({
          currency: 'EUR',
        }).unwrap();
        // await refetch();
        return basketResponse;
      } catch (error) {
        console.error('Error get new basket:', error);
      }
    }
  };

  return { getCreateBasket, activeCart, error };
}
