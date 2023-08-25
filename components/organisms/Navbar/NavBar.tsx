import { storyblokEditable } from '@storyblok/react';
import useBreakpoint from 'utilities/hooks/useBreakpoint';
import { INavBar } from '@models/INavBar';
import NavBarMobile from './NavBarMobile';
import NavBarDesktop from './NavBarDesktop';

const NavBar = ({ blok }: { blok: INavBar }) => {
  const breakpoint = useBreakpoint();

  return (
    <nav
      className="fixed z-20 top-0 pointer-events-none w-full h-full"
      {...storyblokEditable(blok)}
    >
      {breakpoint === 'sm' || breakpoint === 'md' ? (
        <NavBarMobile {...blok} />
      ) : (
        <NavBarDesktop {...blok} />
      )}
    </nav>
  );
};
export default NavBar;
