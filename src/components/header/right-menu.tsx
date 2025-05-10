import { Button } from '../ui/button/button';
import { useLocation } from 'react-router-dom';

export function LoginMenu() {
  const location = useLocation();

  return (
    <div className="flex items-center gap-2">
      {location.pathname === '/' && (
        <>
          <Button variant={'green'}>Log in</Button>
          <Button>Sing in</Button>
        </>
      )}
      {location.pathname === '/login' && <Button>Sign in</Button>}
      {location.pathname === '/singin' && <Button>Log in</Button>}
      <div>
        <img src="/basket.svg" alt="basket" />
      </div>
    </div>
  );
}
