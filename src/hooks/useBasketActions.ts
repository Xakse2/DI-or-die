import { useAnonymousToken } from '@/hooks/useAnonymousToken';
import { useCreateBasket } from '@/hooks/useCreateBasket';
import { useUpdateCart } from './useUpdateBasket';

export function useBasketActions() {
  const { getToken } = useAnonymousToken();
  const { getCreateBasket } = useCreateBasket();
  const { getUpdateCart } = useUpdateCart();

  const handleAddToBasket = async (
    event: React.MouseEvent<HTMLButtonElement>,
    sku: string,
    quantity: number,
    variantId?: number,
  ) => {
    event.stopPropagation();

    await getToken();
    const activeCart = await getCreateBasket();

    console.log('Adding to cart:', { sku, quantity, variantId });

    if (activeCart) {
      await getUpdateCart(activeCart.id, activeCart.version, [
        { action: 'addLineItem', sku, quantity },
        // { action: 'removeLineItem', lineItemId: 'some-line-item-id' },
      ]);
    }
  };

  return { handleAddToBasket };
}
