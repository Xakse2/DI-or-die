import { useDeleteCartMutation } from '@/app/slices/api-basket';

export function useDeleteCart() {
  const [deleteCart] = useDeleteCartMutation();

  const getDeleteCart = async (cartId: string, version: number) => {
    try {
      await deleteCart({ cartId, version }).unwrap();
      console.log('Basket deleted successfully');
    } catch (error) {
      console.error('Error deleting basket:', error);
    }
  };
  return { getDeleteCart };
}
