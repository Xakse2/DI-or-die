import { useGetCategoryProductsQuery } from '@/app/slices/api-products';
import ProductsList from '../catalog/ProductsList';
import { useCreateBasket } from '@/hooks/useCreateBasket';

const genderWomen = {
  attribute: 'gender',
  value: 'women',
};

export function Womens() {
  const { data, error, isLoading } = useGetCategoryProductsQuery(genderWomen);
  const { activeCart } = useCreateBasket();

  if (isLoading) return <p>Loadimg...</p>;
  if (error) {
    const errorMessage =
      'status' in error
        ? `Error: ${error.status} - ${JSON.stringify(error.data)}`
        : `Error: ${error.message ?? 'Unknown error'}`;

    return <p>{errorMessage}</p>;
  }

  return (
    <div className="bg-gray-100 w-full">
      <h1 className="text-4xl text-center pt-4">Womens sneakers</h1>
      <ProductsList
        products={data?.products?.results ?? []}
        cartItems={activeCart?.lineItems ?? []}
      />
    </div>
  );
}
