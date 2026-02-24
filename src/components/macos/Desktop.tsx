import { memo, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
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
  const hasOpenWindows = Object.values(windows).some(w => w.isOpen && !w.isMinimized);

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {/* Wallpaper */}
      <img
        src={wallpaper}
        alt="Desktop wallpaper"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Desktop Greeting */}
      {!hasOpenWindows && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          style={{ top: 'var(--mac-menubar-height)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        >
          <div className="text-center">
            <motion.h1
              className="text-6xl md:text-7xl font-extralight tracking-tight"
              style={{
                color: 'rgba(255,255,255,0.9)',
                textShadow: '0 2px 40px rgba(0,0,0,0.3)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              Hello, this is{' '}
              <span className="font-semibold" style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #a8d8ff 50%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Hari
              </span>
            </motion.h1>
            <motion.p
              className="mt-4 text-lg font-light tracking-wide"
              style={{
                color: 'rgba(255,255,255,0.6)',
                textShadow: '0 1px 20px rgba(0,0,0,0.2)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Welcome to my portfolio
            </motion.p>
          </div>
        </motion.div>
      )}

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
