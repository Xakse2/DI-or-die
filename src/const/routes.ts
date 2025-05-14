import type { RoutePages } from '@/interfaces/RoutePages';
import { HomePage } from '@/pages/home/HomePage';
import { LoginPage } from '@/pages/login/LoginPage';
import { RegistrationPage } from '@/pages/registration/RegistrationPage';

export const routes: RoutePages[] = [
  { path: '/', element: HomePage },
  { path: '/login', element: LoginPage },
  { path: '/signup', element: RegistrationPage },
];
