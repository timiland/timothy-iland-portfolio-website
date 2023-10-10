import { storyblokEditable } from '@storyblok/react';
import useBreakpoint from 'utilities/hooks/useBreakpoint';
import { INavBar } from '@models/INavBar';
import ColouredLogo from '@atoms/ColouredLogo/ColouredLogo';
import ColoursEnum from '@models/enums/ColoursEnum';
import Link from 'next/link';
import NavBarDesktop from './NavBarDesktop';
import NavBarMobile from './NavBarMobile';

const NavBar = ({ blok }: { blok: INavBar }) => {
  const breakpoint = useBreakpoint();

  return (
    <nav
      className="fixed z-20 top-0 pointer-events-none w-full h-full"
      {...storyblokEditable(blok)}
    >
      {breakpoint ? (
        <>
          {(breakpoint === 'sm' || breakpoint === 'md') && (
            <NavBarMobile {...blok} />
          )}

          {(breakpoint === 'lg' ||
            breakpoint === 'xl' ||
            breakpoint === '2xl') && <NavBarDesktop {...blok} />}
        </>
      ) : (
        <div className="container shadow-xl flex relative z-10 bg-black pointer-events-auto text-white justify-between items-center py-4 border-b-2 border-yellow">
          <Link href="/" passHref>
            <ColouredLogo
              className="w-[140px]"
              colour={ColoursEnum.White}
              outlineColour={ColoursEnum.Black}
            />
          </Link>
        </div>
      )}
    </nav>
  );
};
export default NavBar;
