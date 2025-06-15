import { useAnonymousToken } from '@/hooks/useAnonymousToken';
import { useCreateBasket } from '@/hooks/useCreateBasket';
import { useUpdateCart } from './useUpdateBasket';
import { useCheckActiveBasketQuery } from '@/app/slices/api-basket';

export function useBasketActions() {
  const { data, refetch } = useCheckActiveBasketQuery();
  const { getToken } = useAnonymousToken();
  const { getCreateBasket } = useCreateBasket();
  const { getUpdateCart } = useUpdateCart();

  const handleAddToBasket = async (
    sku: string,
    quantity: number,
    event?: React.MouseEvent<HTMLButtonElement>,
    variantId?: number,
  ) => {
    event?.stopPropagation();

    await getToken();
    const activeCart = await getCreateBasket();
    console.log('Used Cart', data);
    console.log('Adding to cart:', { sku, quantity, variantId });

    if (activeCart) {
      await getUpdateCart(activeCart.id, activeCart.version, [
        { action: 'addLineItem', sku, quantity },
      ]);
      await refetch();
    }
  };

  const handleRemoveFromBasket = async (
    event?: React.MouseEvent<HTMLButtonElement>,
    lineItemId?: string,
    quantity?: number,
  ) => {
    event?.stopPropagation();

    if (!lineItemId) {
      return;
    }
    const activeCart = await getCreateBasket();
    if (activeCart) {
      await getUpdateCart(activeCart.id, activeCart.version, [
        { action: 'removeLineItem', lineItemId, quantity },
      ]);
      await refetch();
    }
  };

  return { handleAddToBasket, handleRemoveFromBasket };
}
