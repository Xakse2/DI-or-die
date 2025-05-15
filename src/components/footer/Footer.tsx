import { NavigationPagesMenu } from '../header/NavigationPagesMenu';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-2 w-full">
      <div className="flex justify-center w-[100%]  py-2 border-b-4 border-green-700">
        <NavigationPagesMenu />
      </div>
      <Link to="/" className="items-center  h-auto py-2">
        <img className="h-[3rem]" src="/logosneak.svg" alt="logo" />
      </Link>
      <div className="flex justify-center gap-10">
        <Link to="/" className="items-center  h-auto">
          Conditions of Use
        </Link>
        <Link to="/" className="items-center  h-auto">
          Privacy Notice
        </Link>
      </div>
      <div className="pb-4">© 2025, FlexWalk Ltd</div>
    </footer>
  );
}
