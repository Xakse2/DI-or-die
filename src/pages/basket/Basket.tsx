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

  return (
    <div>
      <h3 className="text-2xl text-center pt-4">Basket</h3>
      {activeCart && activeCart.lineItems.length > 0 ? (
        <ul>
          {activeCart.lineItems.map(item => (
            <li key={item.id}>
              {item.name} - {item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-center py-4">
          Your cart is currently empty.
        </p>
      )}
    </div>
  );
}
