import { NavigationPagesMenu } from './NavigationPagesMenu';
import { LoginMenu } from './LoginMenu';

export function Header() {
  return (
    <header className="flex flex-col w-full max-w-[1280px]">
      <div className="justify-items-center  h-auto">
        <img className="h-[5rem]" src="/logosneak.svg" alt="logo" />
      </div>
      <div className="flex justify-between">
        <NavigationPagesMenu />
        <LoginMenu />
      </div>
    </header>
  );
}
