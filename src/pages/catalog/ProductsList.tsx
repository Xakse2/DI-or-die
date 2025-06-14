import type { Product } from '@/interfaces/prodactResponse';
import { useNavigate } from 'react-router-dom';
import './catalog.css';
import { Button } from '@/components/ui/button/button';
import {
  useCheckActiveBasketQuery,
  useGetNewBasketMutation,
} from '@/app/slices/api-basket';
import { useGetAnonymousSessionMutation } from '@/app/slices/api-anonim';
import { storage } from '@/service/local-storage';

const ProductsList = ({ products }: { products: Product[] }) => {
  const navigate = useNavigate();
  const [getAnonymousSession] = useGetAnonymousSessionMutation();
  const [createBasket] = useGetNewBasketMutation();
  const { data: activeCart } = useCheckActiveBasketQuery();

  const handleClick = (productId: string) => {
    void navigate(`/product/${productId}`);
  };

  const handleAddToBasket = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    const anonymousToken = storage.getData('anonymousToken');
    const authToken = storage.getData('authToken');
    let activeToken = authToken ?? anonymousToken;

    if (!activeToken) {
      try {
        const response = await getAnonymousSession({
          anonymous_id: 'guest-session',
        }).unwrap();

        console.log('Anonymous token', response.access_token);
        storage.setData('anonymousToken', response.access_token);
        activeToken = response.access_token;
      } catch (error) {
        console.error('Error get anonymous token:', error);
        return;
      }
    }
    if (activeToken) {
      if (activeCart) {
        console.log('Active cart already exists, skipping creation.');

        return;
      }
      try {
        const basketResponse = await createBasket({ currency: 'EUR' }).unwrap();
        console.log('New basket:', basketResponse);
      } catch (error) {
        console.error('Error get new basket:', error);
      }
    }
  };

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
            <Button variant={'green'} onClick={handleAddToBasket}>
              Add basket
            </Button>
          </div>
        </div>
      </li>
    );
  });

  return <ul className="catalog">{productItems}</ul>;
};

export default ProductsList;
