import { useState, memo } from 'react';
import folderIcon from '@/assets/icons/finder.png';

export interface DesktopItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  icon: string;
  x: number;
  y: number;
}

const initialItems: DesktopItem[] = [
  {
    id: 'folder-1',
    name: 'My Folder',
    type: 'folder',
    icon: folderIcon,
    x: 60,
    y: 120,
  },
];

const DesktopIcons = memo(({ onOpen }: { onOpen: (item: DesktopItem) => void }) => {
  const [items, setItems] = useState<DesktopItem[]>(initialItems);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    setDraggedId(id);
    const item = items.find(i => i.id === id);
    if (item) {
      setOffset({ x: e.clientX - item.x, y: e.clientY - item.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedId) return;
    setItems(items => items.map(item =>
      item.id === draggedId
        ? { ...item, x: e.clientX - offset.x, y: e.clientY - offset.y }
        : item
    ));
  };

  const handleMouseUp = () => {
    setDraggedId(null);
  };

  return (
    <div
      className="absolute inset-0 z-[20] pointer-events-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {items.map(item => (
        <div
          key={item.id}
          className="absolute flex flex-col items-center cursor-pointer select-none pointer-events-auto"
          style={{ left: item.x, top: item.y, width: 72 }}
          onMouseDown={e => handleMouseDown(e, item.id)}
          onDoubleClick={() => onOpen(item)}
        >
          <img src={item.icon} alt={item.name} className="w-12 h-12 mb-1 drop-shadow" draggable={false} />
          <span className="text-xs text-white text-center bg-black/40 rounded px-1 py-0.5 max-w-[70px] truncate">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
});

export default DesktopIcons;
