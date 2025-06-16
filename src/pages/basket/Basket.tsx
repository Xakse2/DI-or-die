import { Button } from '@/components/ui/button/button';
import { useAnonymousToken } from '@/hooks/useAnonymousToken';
import { useBasketActions } from '@/hooks/useBasketActions';
import { useCreateBasket } from '@/hooks/useCreateBasket';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export function BasketPage() {
  const { getToken } = useAnonymousToken();
  const { getCreateBasket, activeCart, error } = useCreateBasket();
  const [activeToken, setToken] = useState<string>('');

  const { handleRemoveFromBasket, handleUpdateQuantity, handleClearBasket } =
    useBasketActions();

  useEffect(() => {
    const fetchTokenAndCreateBasket = async () => {
      if (!activeToken) {
        const newToken = await getToken();
        if (newToken) {
          setToken(newToken);
        }
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

  useEffect(() => {
    console.log('BasketPage ререндерился', new Date().toISOString());
  }, []);

  return (
    <div className="py-4 w-[80%]">
      <h3 className="text-2xl text-center">Basket</h3>
      {activeCart?.lineItems?.length ? (
        <div className="flex flex-col items-center">
          <ul className="w-full">
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
                  <h4 className="font-bold text-[var(--custom-green)]">
                    {item.name['en-GB']}
                  </h4>
                  <p>
                    Price:{' '}
                    <span>
                      {(item.price.value.centAmount / 100).toFixed(2)}{' '}
                      {item.price.value.currencyCode}
                    </span>
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <div className="flex items-center text-center">
                    <Button
                      variant={'outline'}
                      size={'sm'}
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <Minus />
                    </Button>
                    <input
                      type="number"
                      value={item.quantity}
                      readOnly
                      className="w-12 text-center border rounded"
                    />
                    <Button
                      variant={'outline'}
                      size={'sm'}
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Plus />
                    </Button>
                  </div>

                  <p>
                    Total price:{' '}
                    <span className="font-bold">
                      {(item.totalPrice.centAmount / 100).toFixed(2)}{' '}
                      {item.totalPrice.currencyCode}
                    </span>
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  onClick={() => handleRemoveFromBasket(undefined, item.id)}
                >
                  <Trash2 color="red" />
                </Button>
              </li>
            ))}
          </ul>
          <div className="py-4 w-[50%]">
            <p>
              Total quantity:{' '}
              <span className="font-bold text-[var(--custom-green)]">
                {activeCart.totalLineItemQuantity}
              </span>
            </p>
            <p>
              Total price:{' '}
              <span className="font-bold text-[var(--custom-green)]">
                {(activeCart.totalPrice.centAmount / 100).toFixed(2)}{' '}
                {activeCart.totalPrice.currencyCode}
              </span>
            </p>
            <Button variant="remove" onClick={handleClearBasket}>
              Clear cart
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-lg text-center py-4">
          Your cart is currently empty.
        </p>
      )}
    </div>
  );
}
