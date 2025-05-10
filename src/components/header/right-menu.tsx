import { Button } from '../ui/button/button';

export function LoginMenu() {
  return (
    <div className="flex items-center gap-2">
      <Button variant={'green'}>Log in</Button>
      <Button>Sing in</Button>
      <div>
        <img src="/basket.svg" alt="basket" />
      </div>
    </div>
  );
}
