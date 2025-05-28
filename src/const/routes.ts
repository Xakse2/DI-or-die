import type { RoutePages } from '@/interfaces/RoutePages';
import { HomePage } from '@/pages/home/HomePage';
import { LoginPage } from '@/pages/login/LoginPage';
import { RegistrationPage } from '@/pages/registration/RegistrationPage';
import { AboutPage } from '@/pages/about/AboutPage';
import { Mens } from '@/pages/catalog/Mens';
import { Womens } from '@/pages/catalog/Womens';
import { Conditions } from '@/pages/privacy/Conditions';
import { Privacy } from '@/pages/privacy/Privacy';
import { SalePage } from '@/pages/sale/salePage';
import { UserProfilePage } from '@/pages/profile/UserProfilePage';

export const routes: RoutePages[] = [
  { path: '/', element: HomePage },
  { path: '/login', element: LoginPage },
  { path: '/signup', element: RegistrationPage },
  { path: '/about', element: AboutPage },
  { path: '/mens', element: Mens },
  { path: '/womens', element: Womens },
  { path: '/footer_cou', element: Conditions },
  { path: '/footer_privacy', element: Privacy },
  { path: '/sale', element: SalePage },
  { path: '/profile', element: UserProfilePage },
];
