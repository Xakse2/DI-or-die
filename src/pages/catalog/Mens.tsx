import { useGetCategoryProductsQuery } from '@/app/slices/api-products';
import { useGetNewBasketMutation } from '@/app/slices/api-basket';
import ProductsList from '../catalog/ProductsList';

const genderMen = {
  attribute: 'gender',
  value: 'men',
};

export function Mens() {
  const [createBasket] = useGetNewBasketMutation();

  const handleCreateBasket = async () => {
    try {
      const response = await createBasket({ currency: 'EUR' });
      console.log('Basket created:', response);
    } catch (error) {
      console.error('Error creating basket:', error);
    }
  };

  const { data, error, isLoading } = useGetCategoryProductsQuery(genderMen);

  if (isLoading) return <p>Loading...</p>;
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
      <h1 className="text-4xl text-center pt-4">Mens sneakers</h1>
      <ProductsList
        products={data?.products?.results ?? []}
        handleCreateBasket={handleCreateBasket}
      />
    </div>
  );
}
