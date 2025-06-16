/* eslint-disable unicorn/no-null */

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import type { RootState } from '@/app/store';
import { Button } from '../ui/button/button';
import { useLocation, useNavigate } from 'react-router-dom';
import type { RedirectButtons } from '@/interfaces/redirectButtons';
import { login, logout } from '@/app/slices/auth-slice';
import { LogOut, User } from 'lucide-react';
import { storage } from '@/service/local-storage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/menu/dropdown-menu';

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

  useEffect(() => {
    const savedToken = storage.getData('authToken');
    const savedEmail = storage.getData('userEmail');

    if (savedToken && savedEmail) {
      dispatch(
        login({
          authToken: savedToken,
          username: savedEmail,
          refreshToken: '',
        }),
      );
    }
  }, [dispatch]);

  const username = useSelector((state: RootState) => state.auth.username);

  return (
    <div className="flex items-center gap-2">
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {username.length > 10 ? `${username.slice(0, 9)}…` : username}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-green-600 h-[2px]" />
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <User />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              <Button
                size="sm"
                onClick={() => {
                  localStorage.removeItem('accessToken');
                  dispatch(logout());
                }}
              >
                Log Out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        redirectButton.map(({ path, label, variant }) => {
          const isCurrent = location.pathname === path;
          const isHome = location.pathname === '/';
          return !isCurrent || isHome ? (
            <Button
              className="cursor-pointer"
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

      <div className="transition-transform duration-300 hover:scale-110 cursor-pointer">
        <img src="/basket.svg" alt="basket" />
      </div>
    </div>
  );
}
