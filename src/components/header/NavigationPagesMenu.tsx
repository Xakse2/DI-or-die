import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from '../ui/menu/navigation-menu';
import { navigationMenuTriggerStyle } from '../ui/menu/navigation-menu-style';
import type { MenuItems } from '@/interfaces/menuItems';

const menuItems: MenuItems[] = [
  { title: 'For Men', link: '/mens' },
  { title: 'For Women', link: '/womens' },
  { title: 'About Us', link: '/about' },
];

export function NavigationPagesMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Catalog</NavigationMenuTrigger>
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
