import type { Product } from '@/interfaces/prodactResponse';
import { useNavigate } from 'react-router-dom';
import './catalog.css';
import { Button } from '@/components/ui/button/button';
import { useBasketActions } from '@/hooks/useBasketActions';
import type { LineItem } from '@/interfaces/cartResponse';

const ProductsList = ({
  products,
  cartItems,
}: {
  products: Product[];
  cartItems: LineItem[];
}) => {
  const navigate = useNavigate();

  const handleClick = (productId: string) => {
    void navigate(`/product/${productId}`);
  };

  const { handleAddToBasket, handleRemoveFromBasket } = useBasketActions();

  const productItems = products.map(product => {
    const variant = product.masterData.current.masterVariant;
    const brandValue = variant.attributesRaw.find(
      attribute => attribute.name === 'brand',
    )?.value;

    const brandText =
      typeof brandValue === 'object' ? brandValue.label : brandValue;

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

    const sku = variant.sku;

    const isInCart =
      Array.isArray(cartItems) &&
      cartItems.some(item => item.variant.sku === sku);

    return (
      <li
        key={product.id}
        className="product-item"
        onClick={() => handleClick(product.id)}
      >
        <div className="photo">
          <img src={variant.images[0]?.url} alt="photo" />
        </div>
        <div className="description-item pl-4">
          <h3 className="text-xl text-[var(--custom-green)]">
            {product.masterData.current.name}
          </h3>
          <p>{brandText}</p>
          <p className="pb-1">
            <span className={priceTextColor}>
              {formattedPrice} {priceObject?.value.currencyCode}
            </span>
            <span className="text-red-600 font-bold text-xl">
              {formattedDiscountedPrice}{' '}
              {priceObject?.discounted?.value.currencyCode}
            </span>
          </p>
          <div className="text-center pb-3">
            <Button
              variant={isInCart ? 'remove' : 'green'}
              onClick={event =>
                isInCart
                  ? handleRemoveFromBasket(
                      event,
                      cartItems.find(item => item.variant.sku === sku)?.id,
                    )
                  : handleAddToBasket(sku, 1, event)
              }
            >
              {isInCart ? 'Remove' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </li>
    );
  });

  return <ul className="catalog">{productItems}</ul>;
};

export default ProductsList;
