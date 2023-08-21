import { ReactNode } from 'react';

export interface IBackgroundLogoWrapper {
  children: ReactNode;
}

const BackgroundLogoWrapper = ({ children }: IBackgroundLogoWrapper) => (
  <div className="relative w-full">
    <img
      className="absolute scale-[120%] -translate-x-[100px] opacity-[5%]"
      alt="logo background"
      src="/timothy-iland-logo-black.svg"
    />
    {children}
  </div>
);

export default BackgroundLogoWrapper;
