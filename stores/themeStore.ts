import { create } from 'zustand';

const useThemeStore = create((set) => ({
  theme: 'DEFAULT',
  setTheme: (theme) => set({ theme }),
}));

export default useThemeStore;
