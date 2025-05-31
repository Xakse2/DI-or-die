import type { Product } from '@/interfaces/prodactResponse';
import './catalog.css';
import { Button } from '@/components/ui/button/button';

const ProductsList = ({ products }: { products: Product[] }) => {
  const productItems = products.flatMap(product =>
    product.masterData.current.allVariants.map(variant => {
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

      const priceInCents = variant.prices[0]?.value.centAmount;
      const formattedPrice = priceInCents
        ? (priceInCents / 100).toFixed(2)
        : 'not available';

      const priceTextColor = priceInCents
        ? 'font-bold text-[var(--custom-green)] text-lg'
        : 'text-black text-sm';

      return (
        <li key={variant.key} className="product-item">
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
          <p className={`${priceTextColor} pl-4`}>
            {' '}
            {formattedPrice} {variant.prices[0]?.value.currencyCode}
          </p>
          <div className="text-center pb-2">
            <Button variant={'green'}>Add order</Button>
          </div>
        </li>
      );
    }),
  );

  return <ul className="catalog">{productItems}</ul>;
};

export default ProductsList;
