import { useGetAllProductsQuery } from '@/app/slices/api-products';
import ProductsList from '../catalog/ProductsList';

export function Sport() {
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

  const menProducts = data?.products?.results?.filter(product =>
    product.masterData.current.allVariants.some(variant =>
      variant.attributesRaw.some(
        attribute =>
          attribute.name === 'style' &&
          typeof attribute.value === 'object' &&
          'key' in attribute.value &&
          attribute.value.key === 'sport',
      ),
    ),
  );

  return (
    <div className="bg-gray-100 w-full">
      <h1 className="text-4xl">Sport sneakers</h1>
      <ProductsList products={menProducts ?? []} />
    </div>
  );
}
