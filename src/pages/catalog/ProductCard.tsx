import { useGetProductCardQuery } from '@/app/slices/api-products';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useState } from 'react';
import { Button } from '@/components/ui/button/button';
import { ChevronRightIcon } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import './catalog.css';
import { useBasketActions } from '@/hooks/useBasketActions';

export function ProductCard() {
  const { productId } = useParams<{ productId: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { handleAddToBasket } = useBasketActions();

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

  const variants = data?.product?.masterData.current.allVariants ?? [];

  const brandValue = variants[0].attributesRaw.find(
    attribute => attribute.name === 'brand',
  )?.value;

  const brandText =
    typeof brandValue === 'object' ? brandValue.label : brandValue;

  const genderValue = variants[0].attributesRaw.find(
    attribute => attribute.name === 'gender',
  )?.value;

  let genderText;
  if (genderValue) {
    genderText =
      typeof genderValue === 'object' ? genderValue.label : genderValue;
  }

  const styleValue = variants[0].attributesRaw.find(
    attribute => attribute.name === 'style',
  )?.value;

  let styleText;
  if (styleValue) {
    styleText = typeof styleValue === 'object' ? styleValue.label : styleValue;
  }

  const colors = variants
    .map(
      variant =>
        variant.attributesRaw.find(attribute => attribute.name === 'color')
          ?.value,
    )
    .filter(Boolean);

  const sizes = variants
    .map(
      variant =>
        variant.attributesRaw.find(attribute => attribute.name === 'sizes')
          ?.value,
    )
    .filter(Boolean);

  const priceData = variants.map(variant => {
    const price = variant.prices[0]?.value;
    const discountedPrice = variant.prices[0]?.discounted?.value;

    return {
      price: price ? (price.centAmount / 100).toFixed(2) : undefined,
      discountedPrice: discountedPrice
        ? (discountedPrice.centAmount / 100).toFixed(2)
        : undefined,
      currency: price?.currencyCode || discountedPrice?.currencyCode,
    };
  });

  const images = variants.flatMap(variant =>
    variant.images.map(img => img.url),
  );

  const sku = variants[0].sku;

  const nextImage = () =>
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
  const prevImage = () =>
    setCurrentImageIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length,
    );

  return (
    <div className="py-8 px-6  max-w-[1280px]">
      <div className="card-element flex justify-evenly">
        <div className="image-slider">
          {images.length > 0 ? (
            <>
              <Button
                variant="outline"
                size="icon"
                className="slider-button left size-8"
                onClick={prevImage}
              >
                <ChevronLeft />
              </Button>
              <img src={images[currentImageIndex]} alt="Product" />
              <Button
                variant="outline"
                size="icon"
                className="slider-button right size-8"
                onClick={nextImage}
              >
                <ChevronRightIcon />
              </Button>
            </>
          ) : (
            <p>No images available</p>
          )}
        </div>
        <div className="description flex flex-col gap-2 pl-4">
          <h2 className="text-3xl">{data?.product?.masterData.current.name}</h2>
          <div className="flex gap-4 flex-wrap">
            <p>{genderText}</p>
            <p>{styleText}</p>
          </div>
          <div className="">
            {priceData.map((data, index) => (
              <div key={index} className="text-lg flex items-end gap-4">
                <p
                  className={
                    data.discountedPrice
                      ? 'line-through'
                      : 'font-bold text-[var(--custom-green)] text-xl'
                  }
                >
                  {data.price} {data.currency}
                </p>
                {data.discountedPrice && (
                  <p className="text-red-500 font-bold text-xl">
                    {data.discountedPrice} {data.currency}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <p className="">color</p>
              {colors.map((color, index) => {
                const colorText =
                  typeof color === 'object' ? color.label : color;
                return (
                  <p
                    key={index}
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: String(colorText) }}
                  ></p>
                );
              })}
            </div>
          </div>
          <div>
            <p className="pb-2">Available size:</p>
            <div className="flex gap-2">
              {sizes.map((size, index) => {
                const sizeText = typeof size === 'object' ? size.label : size;
                return (
                  <p key={index} className="w-8 h-8 border rounded text-center">
                    {sizeText}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="pt-2">
            <Button
              variant={'green'}
              onClick={event => handleAddToBasket(event, sku, 1)}
            >
              Add basket
            </Button>
          </div>
        </div>
      </div>
      <div className="pt-6">
        <p className="text-lg pb-2">brand: {brandText}</p>
        <p>description: {data?.product?.masterData.current.description}</p>
      </div>
    </div>
  );
}
