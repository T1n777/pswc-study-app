import type { StateCreator } from 'zustand';

export interface SettingsSlice {
  theme: 'dark' | 'light';
  fontSize: 'sm' | 'md' | 'lg';
  sidebarCollapsed: boolean;
  toggleTheme: () => void;
  setFontSize: (size: 'sm' | 'md' | 'lg') => void;
  toggleSidebar: () => void;
}

export const createSettingsSlice: StateCreator<SettingsSlice> = (set) => ({
  theme: 'dark',
  fontSize: 'md',
  sidebarCollapsed: false,

  toggleTheme: () => {
    set((state) => ({
      theme: state.theme === 'dark' ? 'light' : 'dark',
    }));
  },

  setFontSize: (size: 'sm' | 'md' | 'lg') => set({ fontSize: size }),

  toggleSidebar: () => {
    set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed,
    }));
  },
});
