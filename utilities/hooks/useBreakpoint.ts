import { useCallback, useEffect, useState } from 'react';
import parseStringToNumber from 'utilities/helpers/parseStringToNumber';
import screens from '../../config';

const getCurrentBreakpoint = () => {
  const breakpoints = {
    tablet: screens.md,
    desktop: screens.lg,
    lgDesktop: screens['2xl'],
  };
  const width = window.innerWidth;
  let device = 'sm';

  if (width < parseStringToNumber(breakpoints.tablet)) {
    device = 'sm';
  } else if (
    width >= parseStringToNumber(breakpoints.tablet) &&
    width < parseStringToNumber(breakpoints.desktop)
  ) {
    device = 'md';
  } else if (
    width >= parseStringToNumber(breakpoints.desktop) &&
    width < parseStringToNumber(breakpoints.lgDesktop)
  ) {
    device = 'lg';
  } else device = 'xl';

  return device;
};

const useBreakpoint = () => {
  const [screen, setScreen] = useState<string>();

  const resizeHandler = useCallback(
    () => setScreen(getCurrentBreakpoint()),
    []
  );

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    setScreen(getCurrentBreakpoint());

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [resizeHandler]);

  return screen;
};

export default useBreakpoint;
