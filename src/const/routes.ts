import type { RoutePages } from '@/interfaces/RoutePages';
import { HomePage } from '@/pages/home/HomePage';
import { LoginPage } from '@/pages/login/LoginPage';
import { RegistrationPage } from '@/pages/registration/RegistrationPage';
import { AboutPage } from '@/pages/about/AboutPage';

export const routes: RoutePages[] = [
  { path: '/', element: HomePage },
  { path: '/login', element: LoginPage },
  { path: '/signup', element: RegistrationPage },
  { path: '/about', element: AboutPage },
];
