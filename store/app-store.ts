import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ViewType = 'studio' | 'flows' | 'components' | 'artifacts' | 'templates' | 'projects' | 'exports' | 'settings';

interface AppState {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      activeView: 'studio',
      setActiveView: (view) => set({ activeView: view }),
      isSidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
    }),
    {
      name: 'cinematic-studio-storage',
    }
  )
);
