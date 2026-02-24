import { useRef, useCallback, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Draggable from 'react-draggable';
import { useWindowStore, type WindowState } from '@/stores/windowStore';

interface WindowProps {
  windowState: WindowState;
  children: React.ReactNode;
}

const MacWindow = memo(({ windowState, children }: WindowProps) => {
  const { closeWindow, minimizeWindow, focusWindow, updatePosition, activeWindowId } = useWindowStore();
  const [isMaximized, setIsMaximized] = useState(false);
    // Maximize handler
    const handleMaximize = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      setIsMaximized((prev) => !prev);
    }, []);
  const nodeRef = useRef<HTMLDivElement>(null);
  const isActive = activeWindowId === windowState.id;
  const [hasEntered, setHasEntered] = useState(false);

  const handleDragStop = useCallback((_: any, data: { x: number; y: number }) => {
    updatePosition(windowState.id, { x: data.x, y: data.y });
  }, [windowState.id, updatePosition]);

  const handleFocus = useCallback(() => {
    focusWindow(windowState.id);
  }, [windowState.id, focusWindow]);

  if (!windowState.isOpen) return null;

  return (
    <AnimatePresence>
      {!windowState.isMinimized && (
        <Draggable
          nodeRef={nodeRef as any}
          handle=".window-header"
          defaultPosition={windowState.position}
          onStop={handleDragStop}
        >
          <div
            ref={nodeRef}
            className="absolute"
            style={
              isMaximized
                ? {
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: windowState.zIndex,
                  }
                : {
                    width: windowState.size.width,
                    height: windowState.size.height,
                    zIndex: windowState.zIndex,
                  }
            }
            onMouseDown={handleFocus}
          >
            <motion.div
              className="w-full h-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              onAnimationComplete={() => setHasEntered(true)}
            >
              <div className={`w-full h-full rounded-xl overflow-hidden mac-window-shadow flex flex-col
                ${isActive ? 'ring-1 ring-foreground/5' : 'opacity-95'}`}
                style={{ background: 'hsl(var(--mac-window-bg))' }}
              >
                {/* Header */}
                <div className="window-header flex items-center h-8 px-3 gap-2 shrink-0 cursor-grab active:cursor-grabbing"
                  style={{ background: 'hsl(var(--mac-window-header))' }}>
                  <div className="flex items-center gap-2">
                    <button
                      className="traffic-light traffic-red flex items-center justify-center text-[10px] font-bold p-0"
                      onClick={(e) => { e.stopPropagation(); closeWindow(windowState.id); }}
                      title="Close"
                      aria-label="Close"
                      style={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                    >
                      <span className="traffic-symbol" style={{ color: '#7d2222', fontWeight: 700, fontSize: 12, width: '100%', height: '100%', lineHeight: 1, justifyContent: 'center', alignItems: 'center' }}>×</span>
                    </button>
                    <button
                      className="traffic-light traffic-yellow flex items-center justify-center text-[10px] font-bold p-0"
                      onClick={(e) => { e.stopPropagation(); minimizeWindow(windowState.id); }}
                      title="Minimize"
                      aria-label="Minimize"
                      style={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                    >
                      <span className="traffic-symbol" style={{ color: '#a16207', fontWeight: 700, fontSize: 14, width: '100%', height: '100%', lineHeight: 1, justifyContent: 'center', alignItems: 'center' }}>–</span>
                    </button>
                    <button
                      className="traffic-light traffic-green flex items-center justify-center text-[10px] font-bold p-0"
                      onClick={handleMaximize}
                      title="Maximize"
                      aria-label="Maximize"
                      style={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                    >
                      <span className="traffic-symbol" style={{ color: '#166534', fontWeight: 700, fontSize: 12, width: '100%', height: '100%', lineHeight: 1, justifyContent: 'center', alignItems: 'center' }}>⤢</span>
                    </button>
                  </div>
                  <span className="flex-1 text-center text-xs font-medium"
                    style={{ color: 'hsl(220 10% 40%)' }}>
                    {windowState.title}
                  </span>
                  <div className="w-14" />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto" style={{ color: 'hsl(220 10% 20%)' }}>
                  {children}
                </div>
              </div>
            </motion.div>
          </div>
        </Draggable>
      )}
    </AnimatePresence>
  );
});

MacWindow.displayName = 'MacWindow';
export default MacWindow;
