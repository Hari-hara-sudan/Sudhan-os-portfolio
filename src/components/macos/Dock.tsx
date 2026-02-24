import { useRef, useState, useCallback, memo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useWindowStore } from '@/stores/windowStore';

import finderIcon from '@/assets/icons/finder.png';
import notesIcon from '@/assets/icons/notes.png';
import terminalIcon from '@/assets/icons/terminal.png';
import safariIcon from '@/assets/icons/safari.png';
import previewIcon from '@/assets/icons/preview.png';
import trashIcon from '@/assets/icons/trash.png';

const dockItems = [
  { id: 'finder', label: 'Finder', icon: finderIcon },
  { id: 'notes', label: 'Notes', icon: notesIcon },
  { id: 'terminal', label: 'Terminal', icon: terminalIcon },
  { id: 'safari', label: 'Safari', icon: safariIcon },
  { id: 'preview', label: 'Preview', icon: previewIcon },
  { id: 'trash', label: 'Trash', icon: trashIcon },
];

const ICON_SIZE = 48;
const MAX_SCALE = 1.8;
const EFFECT_RADIUS = 120;
const SIGMA = 60;

function DockIcon({ item, mouseX, isOpen }: {
  item: typeof dockItems[0];
  mouseX: ReturnType<typeof useMotionValue<number>>;
  isOpen: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { openWindow, restoreWindow, windows } = useWindowStore();

  const distance = useTransform(mouseX, (val: number) => {
    if (!ref.current || val === -1) return 999;
    const rect = ref.current.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    return Math.abs(val - center);
  });

  const scale = useTransform(distance, (d: number) => {
    if (d > EFFECT_RADIUS) return 1;
    return 1 + (MAX_SCALE - 1) * Math.exp(-(d * d) / (2 * SIGMA * SIGMA));
  });

  const springScale = useSpring(scale, { stiffness: 300, damping: 20 });
  const translateY = useTransform(springScale, (s: number) => -(s - 1) * 20);

  const handleClick = useCallback(() => {
    if (item.id === 'trash') return;
    const win = windows[item.id];
    if (win?.isOpen && win?.isMinimized) {
      restoreWindow(item.id);
    } else {
      openWindow(item.id);
    }
  }, [item.id, windows, openWindow, restoreWindow]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center relative cursor-pointer group"
      style={{ scale: springScale, y: translateY }}
      onClick={handleClick}
      whileTap={{ scale: 0.9 }}
    >
      <img
        src={item.icon}
        alt={item.label}
        className="w-12 h-12 object-contain drop-shadow-lg transition-[filter] duration-150"
        style={{ filter: 'brightness(1)' }}
        onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.15)'}
        onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}
        draggable={false}
      />
      {isOpen && (
        <div className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-foreground/80" />
      )}
      {/* Tooltip */}
      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity
        mac-glass text-foreground text-xs px-3 py-1 rounded-md whitespace-nowrap pointer-events-none shadow-lg">
        {item.label}
      </div>
    </motion.div>
  );
}

const Dock = memo(() => {
  const mouseX = useMotionValue(-1);
  const windows = useWindowStore((s) => s.windows);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseX.set(e.clientX);
  }, [mouseX]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-1);
  }, [mouseX]);

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[9998]">
      <motion.div
        className="mac-dock-glass rounded-2xl px-3 py-2 flex items-end gap-2"
        style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {dockItems.map((item) => (
          <DockIcon
            key={item.id}
            item={item}
            mouseX={mouseX}
            isOpen={windows[item.id]?.isOpen && !windows[item.id]?.isMinimized}
          />
        ))}
      </motion.div>
    </div>
  );
});

Dock.displayName = 'Dock';
export default Dock;
