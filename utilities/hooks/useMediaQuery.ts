import { useCallback, useEffect, useState } from 'react';

const useMediaQuery = (minWidth: number) => {
  // Setting a default state, leaving it undefined is essentially falsey anyway
  const [isSmallerThan, setIsSmallerThan] = useState(false);

  const handler = useCallback(() => {
    const isDesiredWidth = window.innerWidth < minWidth;
    setIsSmallerThan(isDesiredWidth);
  }, [minWidth]);

  useEffect(() => {
    window.addEventListener('resize', handler);
    handler();

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, [handler]);

  return isSmallerThan;
};

export default useMediaQuery;
