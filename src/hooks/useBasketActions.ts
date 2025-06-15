import { useAnonymousToken } from '@/hooks/useAnonymousToken';
import { useCreateBasket } from '@/hooks/useCreateBasket';
import { useUpdateCart } from './useUpdateBasket';
import { useCheckActiveBasketQuery } from '@/app/slices/api-basket';
import { useDeleteCart } from './useDeleteBasket';

export function useBasketActions() {
  const { data, refetch } = useCheckActiveBasketQuery();
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
    const activeCart = await getCreateBasket();

    if (activeCart) {
      try {
        console.log('ID текущей корзины перед удалением:', activeCart.id);
        await getDeleteCart(activeCart.id, activeCart.version);

        console.log('Корзина удалена');

        // dispatch(basketCreateApi.util.invalidateTags(['Basket']));
        await new Promise(resolve => setTimeout(resolve, 500));

        // const newBasket = await getCreateBasket();
        // console.log('New basket created:', newBasket?.id);
        console.log('ID текущей корзины перед удалением:', activeCart.id);
        await refetch();
      } catch (error) {
        console.error('Error clearing basket:', error);
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
