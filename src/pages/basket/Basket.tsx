// import { useCreateBasket } from '@/hooks/useCreateBasket';
import { useGetNewBasketMutation } from '@/app/slices/api-basket';
import { useEffect } from 'react';
import { useGetAnonymousSessionMutation } from '@/app/slices/api-anonim';
import { storage } from '@/service/local-storage';
import { useDispatch } from 'react-redux';
import { setToken } from '@/app/slices/token-slice';

export function BasketPage() {
  const [getAnonymousSession] = useGetAnonymousSessionMutation();
  const [createBasket] = useGetNewBasketMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTokensAndCreateBasket = async () => {
      const anonymousToken = storage.getData('anonymousToken');
      const authToken = storage.getData('authToken');
      let activeToken = authToken ?? anonymousToken;

      if (!activeToken) {
        try {
          const response = await getAnonymousSession({
            anonymous_id: 'guest-session',
          }).unwrap();
          console.log('Anonymous token', response.access_token);
          storage.setData('anonymousToken', response.access_token);
          activeToken = response.access_token;
        } catch (error) {
          console.error('Error get anonymous token:', error);
          return;
        }
      }

      if (activeToken) {
        dispatch(setToken(activeToken));
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

    void fetchTokensAndCreateBasket();
  }, [getAnonymousSession, createBasket, dispatch]);

  return <h3>Basket</h3>;
}
