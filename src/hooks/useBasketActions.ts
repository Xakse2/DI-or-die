import { useAnonymousToken } from '@/hooks/useAnonymousToken';
import { useCreateBasket } from '@/hooks/useCreateBasket';

export function useBasketActions() {
  const { getToken } = useAnonymousToken();
  const { getCreateBasket } = useCreateBasket();

  const handleAddToBasket = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();

    await getToken();
    await getCreateBasket();
  };

  return { handleAddToBasket };
}
