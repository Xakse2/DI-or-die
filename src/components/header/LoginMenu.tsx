import { Button } from '../ui/button/button';
import { useLocation } from 'react-router-dom';

const isAuthenticated = false;

export function LoginMenu() {
  const location = useLocation();

  return (
    <div className="flex items-center gap-2">
      {!isAuthenticated &&
        location.pathname !== '/login' &&
        location.pathname !== '/signup' && (
          <>
            <Button variant={'green'} size={'sm'}>
              Log In
            </Button>
            <Button size={'sm'}>Sign Up</Button>
          </>
        )}
      {!isAuthenticated && location.pathname === '/login' && (
        <Button size={'sm'}>Sign Up</Button>
      )}
      {!isAuthenticated && location.pathname === '/signup' && (
        <Button variant={'green'} size={'sm'}>
          Log In
        </Button>
      )}
      {isAuthenticated && (
        <Button variant={'green'} size={'sm'}>
          Profile
        </Button>
      )}
      <div>
        <img src="/basket.svg" alt="basket" />
      </div>
    </div>
  );
}
