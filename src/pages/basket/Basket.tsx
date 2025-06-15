import { Button } from '@/components/ui/button/button';
import { useAnonymousToken } from '@/hooks/useAnonymousToken';
import { useBasketActions } from '@/hooks/useBasketActions';
import { useCreateBasket } from '@/hooks/useCreateBasket';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export function BasketPage() {
  const { getToken } = useAnonymousToken();
  const { getCreateBasket, activeCart, error } = useCreateBasket();
  const [activeToken, setToken] = useState<string>('');

  const { handleRemoveFromBasket } = useBasketActions();

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
    <div className="py-4 w-[80%]">
      <h3 className="text-2xl text-center">Basket</h3>
      {activeCart?.lineItems?.length ? (
        <div>
          <ul>
            {activeCart.lineItems.map(item => (
              <li
                key={item.id}
                className="flex justify-between gap-8 p-2 border-b"
              >
                <img
                  src={item.variant.images[0]?.url}
                  alt={item.name['en-GB']}
                  className="w-22 h-22"
                />
                <div className="w-[60%]">
                  <p>{item.name['en-GB']}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>
                    Price: {item.price.value.currencyCode}{' '}
                    {item.price.value.centAmount / 100}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  onClick={() => handleRemoveFromBasket(undefined, item.id, 1)}
                >
                  <Trash2 />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-lg text-center py-4">
          Your cart is currently empty.
        </p>
      )}
    </div>
  );
}
