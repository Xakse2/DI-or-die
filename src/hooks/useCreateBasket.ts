import { useGetNewBasketMutation } from '@/app/slices/api-basket';
// import { useGetAnonymousSessionQuery } from '@/app/slices/api-anonim';
import { useAnonymousSession } from './useAnonymousSession';
import { storage } from '@/service/local-storage';
import { useCallback } from 'react';

export const useCreateBasket = () => {
  const [createBasket] = useGetNewBasketMutation();
  const { token } = useAnonymousSession();
  console.log(1);
  const authToken = storage.getData('authToken');

  const handleCreateBasket = useCallback(async () => {
    const currentToken = authToken ?? token;

    if (!currentToken) {
      console.error('No token available for basket creation');
      return;
    }

    try {
      const response = await createBasket({ currency: 'EUR' });
      if (response?.data?.id) {
        console.log('New basket created:', response.data.id);

        return response.data;
      }
    } catch (error) {
      console.error('Error creating basket:', error);
      throw error;
    }
  }, [authToken, token, createBasket]);

  return { handleCreateBasket };
};
