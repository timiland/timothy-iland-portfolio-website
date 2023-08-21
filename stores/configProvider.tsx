import ISiteConfig from '@models/ISiteConfig';
import React, { createContext, useContext } from 'react';

type configContextType = ISiteConfig | null;

const configContext = createContext<configContextType>(null);

export function ConfigProvider({
  config,
  children,
}: {
  children: React.ReactNode;
  config: ISiteConfig;
}) {
  return (
    <configContext.Provider value={config}>{children}</configContext.Provider>
  );
}

export function useConfig(): configContextType {
  return useContext(configContext);
}
