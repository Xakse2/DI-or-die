import { useGetProductCardQuery } from '@/app/slices/api-products';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';

export function ProductCard() {
  const { productId } = useParams<{ productId: string }>();
  console.log('productId:', productId);
  const { data, error, isLoading } = useGetProductCardQuery(
    productId ? { id: productId } : skipToken,
  );

  if (isLoading) return <p>Loadimg...</p>;
  if (error) {
    const errorMessage =
      'status' in error
        ? `Error: ${error.status} - ${JSON.stringify(error.data)}`
        : `Error: ${error.message ?? 'Unknown error'}`;

    return <p>{errorMessage}</p>;
  }
  console.log({ data, error, isLoading });
}
