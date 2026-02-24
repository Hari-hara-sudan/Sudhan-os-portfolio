import { memo } from 'react';
import linkedinIcon from '@/assets/icons/linkedin.png';
import githubIcon from '@/assets/icons/github.png';
import gmailIcon from '@/assets/icons/gmail.png';
import favvvIcon from '@/assets/icons/favvv.png';
const links = [
  { label: 'GitHub', url: 'https://github.com/Hari-hara-sudan', icon: githubIcon, description: 'View my open-source projects and contributions', isImg: true },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/harihara-sudan-kmu/', icon: linkedinIcon, description: 'Connect with me professionally', isImg: true },
  { label: 'Portfolio', url: '#', icon: favvvIcon, description: "You're looking at it right now!", isImg: true },
  { label: 'Email', url: 'mailto:hariharasudhan2212@gmail.com', icon: gmailIcon, description: 'hariharasudhan2212@gmail.com', isImg: true },
];

const SafariApp = memo(() => (
  <div className="h-full flex flex-col">
    {/* URL Bar */}
    <div className="flex items-center px-3 py-2 gap-2 border-b border-black/10"
      style={{ background: 'hsl(220 10% 95%)' }}>
      <div className="flex gap-1 text-black/30">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M15 19l-7-7 7-7" />
        </svg>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </div>
      <div className="flex-1 text-center text-xs text-black/50 bg-black/5 rounded-md py-1 px-3">
        hari-os://links
      </div>
    </div>
    {/* Content */}
    <div className="flex-1 p-6 overflow-auto">
      <h2 className="text-lg font-semibold text-black/80 mb-1">Quick Links</h2>
      <p className="text-xs text-black/40 mb-5">Connect with me across the web</p>
      <div className="grid grid-cols-2 gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target={link.url.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="p-4 rounded-xl border border-black/8 hover:border-black/15 hover:shadow-md
              transition-all group"
            style={{ background: 'hsl(220 10% 98%)' }}
          >
            <div className="text-2xl mb-2">
              {link.isImg ? (
                <img src={link.icon} alt={link.label} className="w-8 h-8 rounded" />
              ) : (
                link.icon
              )}
            </div>
            <div className="text-sm font-semibold text-black/80 group-hover:text-blue-500 transition-colors">
              {link.label}
            </div>
            <div className="text-xs text-black/45 mt-1">{link.description}</div>
          </a>
        ))}
      </div>
    </div>
  </div>
));

SafariApp.displayName = 'SafariApp';
export default SafariApp;
