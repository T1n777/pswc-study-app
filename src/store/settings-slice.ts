import type { StateCreator } from 'zustand';

export interface SettingsSlice {
  theme: 'dark' | 'light';
  fontSize: 'sm' | 'md' | 'lg';
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  toggleTheme: () => void;
  setFontSize: (size: 'sm' | 'md' | 'lg') => void;
  toggleSidebar: () => void;
  setMobileSidebarOpen: (open: boolean) => void;
}

export const createSettingsSlice: StateCreator<SettingsSlice> = (set) => ({
  theme: 'dark',
  fontSize: 'md',
  sidebarCollapsed: false,
  mobileSidebarOpen: false,

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

  setMobileSidebarOpen: (open: boolean) => set({ mobileSidebarOpen: open }),
});
