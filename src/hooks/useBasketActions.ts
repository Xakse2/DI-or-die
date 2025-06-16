import { useAnonymousToken } from '@/hooks/useAnonymousToken';
import { useCreateBasket } from '@/hooks/useCreateBasket';
import { useUpdateCart } from './useUpdateBasket';
import {
  useCheckActiveBasketQuery,
  useGetNewBasketMutation,
} from '@/app/slices/api-basket';
import { useDeleteCart } from './useDeleteBasket';
import { storage } from '@/service/local-storage';

export function useBasketActions() {
  const [createBasket] = useGetNewBasketMutation();
  const { data, refetch } = useCheckActiveBasketQuery(undefined, {
    skip:
      storage.getData('authToken') === null &&
      storage.getData('anonymousToken') === null,
  });
  const { getToken } = useAnonymousToken();
  const { getCreateBasket } = useCreateBasket();
  const { getUpdateCart } = useUpdateCart();
  const { getDeleteCart } = useDeleteCart();

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

  const handleUpdateQuantity = async (
    lineItemId?: string,
    newQuantity?: number,
  ) => {
    if (!lineItemId || !newQuantity || newQuantity <= 0) {
      return;
    }
    const activeCart = await getCreateBasket();

    if (activeCart) {
      await getUpdateCart(activeCart.id, activeCart.version, [
        { action: 'changeLineItemQuantity', lineItemId, quantity: newQuantity },
      ]);
      await refetch();
    }
  };

  const handleClearBasket = async () => {
    if (data) {
      try {
        await getDeleteCart(data.id, data.version);
        await refetch();
        const basketResponse = await createBasket({
          currency: 'EUR',
        }).unwrap();
        return basketResponse;
      } catch (error) {
        console.error('Error remove cart:', error);
      }
    }
  };

  return {
    handleAddToBasket,
    handleRemoveFromBasket,
    handleUpdateQuantity,
    handleClearBasket,
  };
}
