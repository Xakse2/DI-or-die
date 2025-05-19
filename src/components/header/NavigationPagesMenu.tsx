import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '../ui/menu/navigation-menu';
import { navigationMenuTriggerStyle } from '../ui/menu/navigation-menu-style';
import type { MenuItems } from '@/interfaces/menuItems';

const menuCatalogItems: MenuItems[] = [
  { title: 'For Men', link: '/mens' },
  { title: 'For Women', link: '/womens' },
];

const menuItems: MenuItems[] = [
  { title: 'Sale', link: '/sale' },
  { title: 'About Us', link: '/about' },
];

export function NavigationPagesMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Catalog</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white shadow-md rounded-md">
            <ul className="flex flex-col gap-2 p-4">
              {menuCatalogItems.map((item, index) => (
                <li key={index}>
                  <Link to={item.link} className={navigationMenuTriggerStyle()}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {menuItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            <Link to={item.link} className={navigationMenuTriggerStyle()}>
              {item.title}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
