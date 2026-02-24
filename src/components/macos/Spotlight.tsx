import { useState, useEffect, useRef, useCallback, memo } from 'react';
import linkedinIcon from '@/assets/icons/linkedin.png';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/stores/windowStore';
import GithubIcon from '@/assets/icons/github.png';

const searchItems = [
  { id: 'notes', label: 'About Me', icon: '📝', category: 'Apps' },
  { id: 'finder', label: 'Projects', icon: '📂', category: 'Apps' },
  { id: 'terminal', label: 'Skills', icon: '⌨️', category: 'Apps' },
  { id: 'preview', label: 'Resume', icon: '📄', category: 'Apps' },
  { id: 'safari', label: 'Links', icon: '🌐', category: 'Apps' },
  { id: 'github', label: 'GitHub', icon: GithubIcon, category: 'Links', url: 'https://github.com' },
  { id: 'linkedin', label: 'LinkedIn', icon: linkedinIcon, category: 'Links', url: 'https://www.linkedin.com/in/harihara-sudan-kmu/' },
];

const Spotlight = memo(() => {
  const { spotlightOpen, closeSpotlight, openWindow } = useWindowStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = searchItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (spotlightOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [spotlightOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === ' ') {
        e.preventDefault();
        useWindowStore.getState().toggleSpotlight();
      }
      if (e.key === 'Escape' && spotlightOpen) {
        closeSpotlight();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [spotlightOpen, closeSpotlight]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      const item = filtered[selectedIndex];
      if ('url' in item && item.url) {
        window.open(item.url, '_blank');
      } else {
        openWindow(item.id);
      }
      closeSpotlight();
    }
  }, [filtered, selectedIndex, openWindow, closeSpotlight]);

  return (
    <AnimatePresence>
      {spotlightOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[10000] bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSpotlight}
          />
          <motion.div
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[10001] w-[560px] mac-spotlight-glass rounded-2xl overflow-hidden"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            <div className="flex items-center px-4 py-3 gap-3 border-b border-foreground/10">
              <svg className="w-5 h-5 text-foreground/50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="6" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                onKeyDown={handleKeyDown}
                placeholder="Search Hari OS"
                className="flex-1 bg-transparent text-foreground text-lg outline-none placeholder:text-foreground/30"
              />
            </div>
            {filtered.length > 0 && (
              <div className="py-2 max-h-80 overflow-auto">
                {filtered.map((item, i) => (
                  <button
                    key={item.id}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors
                      ${i === selectedIndex ? 'bg-primary/80 text-primary-foreground' : 'text-foreground/80 hover:bg-foreground/5'}`}
                    onClick={() => {
                      if ('url' in item && item.url) {
                        window.open(item.url, '_blank');
                      } else {
                        openWindow(item.id);
                      }
                      closeSpotlight();
                    }}
                    onMouseEnter={() => setSelectedIndex(i)}
                  >
                    {item.id === 'linkedin' || item.id === 'github' ? (
                      <img src={item.icon} alt={item.label} className="w-6 h-6 rounded" />
                    ) : (
                      <span className="text-xl">{item.icon}</span>
                    )}
                    <div>
                      <div className="text-sm font-medium">{item.label}</div>
                      <div className="text-xs opacity-60">{item.category}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

Spotlight.displayName = 'Spotlight';
export default Spotlight;
