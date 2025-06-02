import type { Product } from '@/interfaces/prodactResponse';
import { useNavigate } from 'react-router-dom';
import './catalog.css';

const ProductsList = ({ products }: { products: Product[] }) => {
  const navigate = useNavigate();

  const handleClick = (productId: string) => {
    void navigate(`/product/${productId}`);
  };

  const productItems = products.map(product => {
    const variant = product.masterData.current.masterVariant;
    const brandValue = variant.attributesRaw.find(
      attribute => attribute.name === 'brand',
    )?.value;

    const brandText =
      typeof brandValue === 'object' ? brandValue.label : brandValue;

    const colorValue = variant.attributesRaw.find(
      attribute => attribute.name === 'color',
    )?.value;

    const colorText =
      typeof colorValue === 'object' ? colorValue.label : colorValue;

    const priceObject = variant.prices[0];
    const discountedPriceInCents = priceObject?.discounted?.value.centAmount;
    const priceInCents = priceObject?.value.centAmount;

    const formattedDiscountedPrice = discountedPriceInCents
      ? (discountedPriceInCents / 100).toFixed(2)
      : undefined;
    const formattedPrice = priceInCents
      ? (priceInCents / 100).toFixed(2)
      : 'not available';

    const priceTextColor = discountedPriceInCents
      ? 'line-through mr-2'
      : 'font-bold text-[var(--custom-green)] text-lg';

    return (
      <li
        key={product.id}
        className="product-item"
        onClick={() => handleClick(product.id)}
      >
        <div className="photo">
          <img src={variant.images[0]?.url} alt="photo" />
        </div>
        <h3 className="text-xl pl-4">{brandText}</h3>
        <div className="flex gap-2 items-center text-sm pl-4">
          color{' '}
          <p
            style={{
              backgroundColor: String(colorText),
            }}
            className={`${colorText === 'black' ? 'bg-black' : `bg-${colorText}-500`} w-4 h-4 rounded-full`}
          ></p>
        </div>
        <p className="pl-4 pb-1">
          <span className={priceTextColor}>
            {formattedPrice} {priceObject?.value.currencyCode}
          </span>
          <span className="text-red-600 font-bold text-xl">
            {formattedDiscountedPrice}{' '}
            {priceObject?.discounted?.value.currencyCode}
          </span>
        </p>
      </li>
    );
  });

  return <ul className="catalog">{productItems}</ul>;
};

export default ProductsList;
