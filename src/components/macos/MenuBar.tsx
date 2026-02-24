import { useState, useEffect, memo } from 'react';
import { useWindowStore } from '@/stores/windowStore';

const MenuBar = memo(() => {
  const [time, setTime] = useState(new Date());
  const { toggleSpotlight, openWindow } = useWindowStore();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const menuItems = [
    { label: 'About', action: () => openWindow('notes') },
    { label: 'Projects', action: () => openWindow('finder') },
    { label: 'Skills', action: () => openWindow('terminal') },
    { label: 'Resume', action: () => openWindow('preview') },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 mac-glass z-[9999] flex items-center justify-between px-4"
      style={{ height: 'var(--mac-menubar-height)' }}>
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Apple Logo */}
        <button className="text-foreground/90 hover:text-foreground text-sm font-medium">
          
        </button>
        <span className="text-foreground/90 text-[13px] font-semibold">Hari OS</span>
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className="text-foreground/70 hover:text-foreground text-[13px] transition-colors"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 text-foreground/80 text-[13px]">
        {/* WiFi */}
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 18c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1m0-4c2.76 0 5 2.24 5 5h-2c0-1.66-1.34-3-3-3s-3 1.34-3 3H7c0-2.76 2.24-5 5-5m0-4c4.97 0 9 4.03 9 9h-2c0-3.87-3.13-7-7-7s-7 3.13-7 7H3c0-4.97 4.03-9 9-9" />
        </svg>
        {/* Battery */}
        <svg className="w-5 h-4" fill="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="4" y="8" width="12" height="8" rx="1" fill="currentColor" opacity="0.7" />
          <rect x="20" y="9" width="2" height="6" rx="1" fill="currentColor" />
        </svg>
        <span>{formattedDate} {formattedTime}</span>
        {/* Spotlight */}
        <button onClick={toggleSpotlight} className="hover:text-foreground transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="6" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </button>
      </div>
    </div>
  );
});

MenuBar.displayName = 'MenuBar';
export default MenuBar;
