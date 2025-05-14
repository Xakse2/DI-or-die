/* eslint-disable unicorn/no-null */

import { Button } from '../ui/button/button';
import { useLocation, useNavigate } from 'react-router-dom';
import type { RedirectButtons } from '@/interfaces/redirectButtons';

const isAuthenticated = false;

export function LoginMenu() {
  const location = useLocation();
  const navigate = useNavigate();

  const redirectButton: RedirectButtons[] = [
    { path: '/login', label: 'Log In', variant: 'green' },
    { path: '/signup', label: 'Sign Up' },
  ];

  return (
    <div className="flex items-center gap-2">
      {!isAuthenticated &&
        redirectButton.map(({ path, label, variant }) => {
          const isCurrent = location.pathname === path;
          const isHome = location.pathname === '/';
          return !isCurrent || isHome ? (
            <Button
              key={path}
              variant={variant ?? 'default'}
              size="sm"
              onClick={() => navigate(path)}
            >
              {label}
            </Button>
          ) : null;
        })}

      <div>
        <img src="/basket.svg" alt="basket" />
      </div>
    </div>
  );
}
