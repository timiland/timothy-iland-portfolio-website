import { ReactNode } from 'react';

const Frame = ({ children }: { children: ReactNode }) => (
  <div className="bg-gradient-to-b from-black-100 to-black p-3 border-yellow shadow-bold border-2 rounded-3xl overflow-clip">
    {children}
  </div>
);

export default Frame;
