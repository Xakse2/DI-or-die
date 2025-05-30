import './home.css';
import ProductsList from '../catalog/ProductsList';

export function HomePage() {
  // const token = localStorage.getItem('access_token') ?? '';

  return (
    <div>
      <div className="promo-background flex flex-col items-center w-full my-4">
        <img src="/images/main-page-photo.jpg" alt="photo" />
      </div>
      <ProductsList></ProductsList>
    </div>
  );
}
