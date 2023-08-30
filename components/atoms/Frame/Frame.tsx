import clsx from 'clsx';
import { HTMLProps, ReactNode } from 'react';

interface Props extends HTMLProps<HTMLDivElement> {
  readonly children: ReactNode;
}

const Frame = ({ children, className, ...rest }: Props) => (
  <div
    {...rest}
    className={clsx(
      className,
      'bg-gradient-to-b from-black-100 to-black p-3 border-yellow shadow-bold border-2 rounded-3xl overflow-clip'
    )}
  >
    {children}
  </div>
);

export default Frame;
