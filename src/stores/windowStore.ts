import { create } from 'zustand';

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  previousPosition?: { x: number; y: number };
}

interface WindowStore {
  windows: Record<string, WindowState>;
  activeWindowId: string | null;
  highestZ: number;
  spotlightOpen: boolean;

  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  toggleSpotlight: () => void;
  closeSpotlight: () => void;
}

const defaultWindows: Record<string, WindowState> = {
  finder: {
    id: 'finder',
    title: 'Finder — Projects',
    isOpen: false,
    isMinimized: false,
    position: { x: 100, y: 60 },
    size: { width: 720, height: 480 },
    zIndex: 0,
  },
  notes: {
    id: 'notes',
    title: 'Notes — About Me',
    isOpen: false,
    isMinimized: false,
    position: { x: 150, y: 80 },
    size: { width: 600, height: 500 },
    zIndex: 0,
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal — Skills',
    isOpen: false,
    isMinimized: false,
    position: { x: 200, y: 70 },
    size: { width: 650, height: 420 },
    zIndex: 0,
  },
  safari: {
    id: 'safari',
    title: 'Safari — Links',
    isOpen: false,
    isMinimized: false,
    position: { x: 180, y: 90 },
    size: { width: 700, height: 460 },
    zIndex: 0,
  },
  preview: {
    id: 'preview',
    title: 'Preview — Resume',
    isOpen: false,
    isMinimized: false,
    position: { x: 160, y: 50 },
    size: { width: 680, height: 520 },
    zIndex: 0,
  },
};

export const useWindowStore = create<WindowStore>((set) => ({
  windows: defaultWindows,
  activeWindowId: null,
  highestZ: 0,
  spotlightOpen: false,

  openWindow: (id) =>
    set((state) => {
      const newZ = state.highestZ + 1;
      return {
        windows: {
          ...state.windows,
          [id]: {
            ...state.windows[id],
            isOpen: true,
            isMinimized: false,
            zIndex: newZ,
          },
        },
        activeWindowId: id,
        highestZ: newZ,
      };
    }),

  closeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isOpen: false },
      },
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    })),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isMinimized: true,
          previousPosition: state.windows[id].position,
        },
      },
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    })),

  restoreWindow: (id) =>
    set((state) => {
      const newZ = state.highestZ + 1;
      return {
        windows: {
          ...state.windows,
          [id]: {
            ...state.windows[id],
            isMinimized: false,
            zIndex: newZ,
          },
        },
        activeWindowId: id,
        highestZ: newZ,
      };
    }),

  focusWindow: (id) =>
    set((state) => {
      const newZ = state.highestZ + 1;
      return {
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], zIndex: newZ },
        },
        activeWindowId: id,
        highestZ: newZ,
      };
    }),

  updatePosition: (id, position) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], position },
      },
    })),

  toggleSpotlight: () =>
    set((state) => ({ spotlightOpen: !state.spotlightOpen })),

  closeSpotlight: () => set({ spotlightOpen: false }),
}));
