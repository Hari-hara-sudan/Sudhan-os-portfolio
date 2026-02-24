import { memo, lazy, Suspense } from 'react';
import { useWindowStore } from '@/stores/windowStore';
import MenuBar from './MenuBar';
import Dock from './Dock';
import Spotlight from './Spotlight';
import MacWindow from './Window';
import wallpaper from '@/assets/wallpaper.webp';

const FinderApp = lazy(() => import('@/components/apps/FinderApp'));
const NotesApp = lazy(() => import('@/components/apps/NotesApp'));
const TerminalApp = lazy(() => import('@/components/apps/TerminalApp'));
const SafariApp = lazy(() => import('@/components/apps/SafariApp'));
const PreviewApp = lazy(() => import('@/components/apps/PreviewApp'));

const appComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  finder: FinderApp,
  notes: NotesApp,
  terminal: TerminalApp,
  safari: SafariApp,
  preview: PreviewApp,
};

const Desktop = memo(() => {
  const windows = useWindowStore((s) => s.windows);

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {/* Wallpaper */}
      <img
        src={wallpaper}
        alt="Desktop wallpaper"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Menu Bar */}
      <MenuBar />

      {/* Windows container */}
      <div className="absolute inset-0" style={{ top: 'var(--mac-menubar-height)' }}>
        {Object.values(windows).map((win) => {
          const AppComponent = appComponents[win.id];
          if (!AppComponent) return null;
          return (
            <MacWindow key={win.id} windowState={win}>
              <Suspense fallback={
                <div className="flex items-center justify-center h-full text-black/30 text-sm">Loading...</div>
              }>
                <AppComponent />
              </Suspense>
            </MacWindow>
          );
        })}
      </div>

      {/* Dock */}
      <Dock />

      {/* Spotlight */}
      <Spotlight />
    </div>
  );
});

Desktop.displayName = 'Desktop';
export default Desktop;
