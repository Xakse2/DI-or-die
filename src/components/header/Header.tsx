import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="flex flex-col w-full max-w-[1280px]">
      <Link to="/" className="justify-items-center  h-auto">
        <img className="h-[5rem]" src="/logosneak.svg" alt="logo" />
      </Link>
    </header>
  );
}
