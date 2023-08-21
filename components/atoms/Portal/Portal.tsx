import { PropsWithChildren, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  readonly mountId: string;
}

const Portal = ({ mountId, children }: PropsWithChildren<Props>) => {
  const element = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    document.getElementById(mountId)?.appendChild(element);

    return () => {
      document.getElementById(mountId)?.removeChild(element);
    };
  });

  return createPortal(children, element);
};

export default Portal;
