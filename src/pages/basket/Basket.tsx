import { useAnonymousToken } from '@/hooks/useAnonymousToken';
import { useCreateBasket } from '@/hooks/useCreateBasket';
// import {
//   useCheckActiveBasketQuery,
//   useGetNewBasketMutation,
// } from '@/app/slices/api-basket';
import { useEffect, useState } from 'react';
// import { useGetAnonymousSessionMutation } from '@/app/slices/api-anonim';
// import { storage } from '@/service/local-storage';
// import { useDispatch } from 'react-redux';
// import { setToken } from '@/app/slices/token-slice';

export function BasketPage() {
  // const [getAnonymousSession] = useGetAnonymousSessionMutation();
  // const [createBasket] = useGetNewBasketMutation();
  // const { data: activeCart } = useCheckActiveBasketQuery();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchTokensAndCreateBasket = async () => {
  //     const anonymousToken = storage.getData('anonymousToken');
  //     const authToken = storage.getData('authToken');
  //     let activeToken = authToken ?? anonymousToken;

  //     if (!activeToken) {
  //       try {
  //         const response = await getAnonymousSession({
  //           anonymous_id: 'guest-session',
  //         }).unwrap();
  //         console.log('Anonymous token', response.access_token);
  //         storage.setData('anonymousToken', response.access_token);
  //         activeToken = response.access_token;
  //       } catch (error) {
  //         console.error('Error get anonymous token:', error);
  //         return;
  //       }
  //     }

  //     if (activeToken) {
  //       dispatch(setToken(activeToken));
  //       console.log('activeCart:', activeCart);
  //       if (activeCart) {
  //         console.log('Active cart already exists, skipping creation.');

  //         return;
  //       }

  //       try {
  //         const basketResponse = await createBasket({
  //           currency: 'EUR',
  //         }).unwrap();

  //         console.log('New basket:', basketResponse);
  //       } catch (error) {
  //         console.error('Error get new basket:', error);
  //       }
  //     }
  //   };

  //   void fetchTokensAndCreateBasket();
  // }, [getAnonymousSession, createBasket, dispatch]);
  const { getToken } = useAnonymousToken();
  const { getCreateBasket, activeCart, error } = useCreateBasket();
  const [activeToken, setToken] = useState<string>(''); // Храним токен локально

  useEffect(() => {
    const fetchTokenAndCreateBasket = async () => {
      const newToken = await getToken();
      if (newToken) {
        setToken(newToken); // Передаем его в `getCreateBasket`
      }
    };

    void fetchTokenAndCreateBasket(); // Вызываем функцию
  }, []);

  useEffect(() => {
    console.log('Checking conditions for basket creation...');
    // console.log('activeToken:', isErro);
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
