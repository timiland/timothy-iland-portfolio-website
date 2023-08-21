import { useEffect, useState } from 'react';

const useIsTouchDevice = (): boolean => {
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  const handleIsTouchDevice = (): void => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  };

  useEffect(() => {
    handleIsTouchDevice();

    window.addEventListener('resize', handleIsTouchDevice);

    return () => window.removeEventListener('resize', handleIsTouchDevice);
  }, []);

  return isTouchDevice;
};

export default useIsTouchDevice;
