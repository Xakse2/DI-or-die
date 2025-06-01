import { useGetAllProductsQuery } from '@/app/slices/api-products';
import ProductsList from '../catalog/ProductsList';

export function AllProducts() {
  const { data, error, isLoading } = useGetAllProductsQuery();

  if (isLoading) return <p>Loadimg...</p>;
  if (error) {
    const errorMessage =
      'status' in error
        ? `Error: ${error.status} - ${JSON.stringify(error.data)}`
        : `Error: ${error.message ?? 'Unknown error'}`;

    return <p>{errorMessage}</p>;
  }
  console.log({ data, error, isLoading });

  return (
    <div className="bg-gray-100 w-full">
      <h1 className="text-4xl text-center pt-4">All sneakers</h1>
      <ProductsList products={data?.products?.results ?? []} />
    </div>
  );
}
