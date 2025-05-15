/* eslint-disable unicorn/no-null */

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { Button } from '../ui/button/button';
import { useLocation, useNavigate } from 'react-router-dom';
import type { RedirectButtons } from '@/interfaces/redirectButtons';
import { logout } from '@/app/slices/auth-slice';

export function LoginMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const redirectButton: RedirectButtons[] = [
    { path: '/login', label: 'Log In', variant: 'green' },
    { path: '/signup', label: 'Sign Up' },
  ];

  return (
    <div className="flex items-center gap-2">
      {isAuthenticated ? (
        <Button size="sm" onClick={() => dispatch(logout())}>
          Logout
        </Button>
      ) : (
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
        })
      )}

      <div>
        <img src="/basket.svg" alt="basket" />
      </div>
    </div>
  );
}
