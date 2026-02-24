import { memo } from 'react';

const PreviewApp = memo(() => (
  <div className="h-full flex flex-col">
    {/* Toolbar */}
    <div className="flex items-center justify-between px-4 py-2 border-b border-black/10"
      style={{ background: 'hsl(220 10% 95%)' }}>
      <span className="text-xs text-black/50">Hari_Resume.pdf</span>
      <a
        href="/Hari_Resume.pdf"
        download
        className="text-xs text-blue-500 hover:text-blue-600 font-medium"
      >
        ⬇ Download
      </a>
    </div>
    {/* PDF embed */}
    <div className="flex-1">
      <iframe
        src="/Hari_Resume.pdf"
        className="w-full h-full border-0"
        title="Resume"
      />
    </div>
  </div>
));

PreviewApp.displayName = 'PreviewApp';
export default PreviewApp;
