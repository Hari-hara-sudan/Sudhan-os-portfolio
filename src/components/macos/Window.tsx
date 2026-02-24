import { useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Draggable from 'react-draggable';
import { useWindowStore, type WindowState } from '@/stores/windowStore';

interface WindowProps {
  windowState: WindowState;
  children: React.ReactNode;
}

const MacWindow = memo(({ windowState, children }: WindowProps) => {
  const { closeWindow, minimizeWindow, focusWindow, updatePosition, activeWindowId } = useWindowStore();
  const nodeRef = useRef<HTMLDivElement>(null);
  const isActive = activeWindowId === windowState.id;

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
          <motion.div
            ref={nodeRef}
            className="absolute"
            style={{
              width: windowState.size.width,
              height: windowState.size.height,
              zIndex: windowState.zIndex,
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.2, opacity: 0, y: 200 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onMouseDown={handleFocus}
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
                    className="traffic-light traffic-red"
                    onClick={(e) => { e.stopPropagation(); closeWindow(windowState.id); }}
                  />
                  <button
                    className="traffic-light traffic-yellow"
                    onClick={(e) => { e.stopPropagation(); minimizeWindow(windowState.id); }}
                  />
                  <button className="traffic-light traffic-green" />
                </div>
                <span className="flex-1 text-center text-xs font-medium"
                  style={{ color: 'hsl(220 10% 40%)' }}>
                  {windowState.title}
                </span>
                <div className="w-14" /> {/* Spacer for symmetry */}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto" style={{ color: 'hsl(220 10% 20%)' }}>
                {children}
              </div>
            </div>
          </motion.div>
        </Draggable>
      )}
    </AnimatePresence>
  );
});

MacWindow.displayName = 'MacWindow';
export default MacWindow;
