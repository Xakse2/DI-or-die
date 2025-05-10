import NavigationMenuComponents from '../ui/navigation-menu';
import { Link } from 'react-router-dom';

const {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  // NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  // NavigationMenuIndicator,
  // NavigationMenuViewport,
  navigationMenuTriggerStyle,
} = NavigationMenuComponents;

export function NavigationPagesMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Catalog</NavigationMenuTrigger>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/#">
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <span>For Men</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/#">
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <span> For Women</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/#">
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <span>About Us</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
