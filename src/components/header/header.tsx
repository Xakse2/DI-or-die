import { NavigationPagesMenu } from './left-menu';
import { LoginMenu } from './right-menu';

export function Header() {
  return (
    <header className="flex flex-col w-full">
      <div className="justify-items-center">
        <img src="/logosneak.svg" alt="logo" />
      </div>
      <div className="flex justify-between">
        <NavigationPagesMenu />
        <LoginMenu />
      </div>
    </header>
  );
}
