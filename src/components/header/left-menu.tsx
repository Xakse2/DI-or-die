import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from '../ui/menu/navigation-menu';
import { navigationMenuTriggerStyle } from '../ui/menu/navigation-menu-style';

const menuItems: { title: string; link: string }[] = [
  { title: 'For Men', link: '/men' },
  { title: 'For Women', link: '/women' },
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
            <Link to={item.link}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <span>{item.title}</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
