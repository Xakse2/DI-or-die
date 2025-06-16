import { useGetUserBasketQuery } from '@/app/slices/api-basket';

export const useUserBasket = () => {
  const { data, error, isLoading, isFetching } = useGetUserBasketQuery();

  if (error) {
    console.error('Error fetching user basket:', error);
    return { basket: undefined, isLoading, isFetching, error };
  }

  return { basket: data?.results?.[0] ?? undefined, isLoading, isFetching };
};
