import { useCreateBasket } from '@/hooks/useCreateBasket';

import { useEffect } from 'react';

export function BasketPage() {
  const { handleCreateBasket } = useCreateBasket();
  console.log(2);

  useEffect(() => {
    void handleCreateBasket().catch(error =>
      console.error('Error creating basket:', error),
    );
  }, []);

  return <h3>Basket</h3>;
}
