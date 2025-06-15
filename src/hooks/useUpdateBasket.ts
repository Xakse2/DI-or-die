import { useUpdateCartMutation } from '@/app/slices/api-basket';
import type { CartAction } from '@/interfaces/cartResponse';

export function useUpdateCart() {
  const [updateCart] = useUpdateCartMutation();
  //   const productId = event.currentTarget.dataset.productId;

  const getUpdateCart = async (
    cartId: string,
    version: number,
    actions: CartAction[],
  ) => {
    try {
      const response = await updateCart({
        cartId,
        version,
        actions,
      });
      return response;
    } catch (error) {
      console.log('Error update cart:', error);
      return;
    }
  };
  return { getUpdateCart };
}
