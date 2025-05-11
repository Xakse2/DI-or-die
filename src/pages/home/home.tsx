import './home.css';

export function Home() {
  return (
    <div className="flex flex-col items-center w-full py-4">
      <div className="promo-background">
        <img src="/images/main-page-photo.jpg" alt="photo" />
        <div className="promo-background-opacity"></div>
      </div>
    </div>
  );
}
