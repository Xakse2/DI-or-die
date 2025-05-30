import { useGetAllProductsQuery } from '@/app/slices/api-products';
import type { Product } from '@/interfaces/prodactResponse';
import './catalog.css';

const ProductsList = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();

  if (isLoading) return <p>Загрузка...</p>;
  if (error) {
    const errorMessage =
      'status' in error
        ? `Ошибка: ${error.status} - ${JSON.stringify(error.data)}`
        : `Ошибка: ${error.message ?? 'Неизвестная ошибка'}`;

    return <p>{errorMessage}</p>;
  }
  console.log({ data, error, isLoading });

  const productItems = data?.products?.results?.map((product: Product) => {
    const brandValue =
      product.masterData.current.masterVariant.attributesRaw.find(
        attribute => attribute.name === 'brand',
      )?.value;

    const brandText =
      typeof brandValue === 'object' ? brandValue.label : brandValue;

    const priceInCents =
      product.masterData.current.masterVariant.prices[0]?.value.centAmount;
    const formattedPrice = (priceInCents / 100).toFixed(2);

    return (
      <li key={product.id}>
        <img
          src={product.masterData.current.masterVariant.images[0]?.url}
          alt="photo"
          width="200"
        />
        <h3>{brandText}</h3>
        <p>
          price: {formattedPrice}{' '}
          {
            product.masterData.current.masterVariant.prices[0]?.value
              .currencyCode
          }
        </p>
      </li>
    );
  });

  return <ul className="catalog">{productItems}</ul>;
};

export default ProductsList;
