import { useState, useEffect, memo } from 'react';

const skillLines = [
  { cmd: '$ cat languages.txt', output: 'Python, JavaScript, TypeScript' },
  { cmd: '$ cat frameworks.txt', output: 'React, React Native Expo, Next.js, Node.js, Express' },
  { cmd: '$ cat styling.txt', output: 'Tailwind CSS, Bootstrap, HTML/CSS' },
  { cmd: '$ cat databases.txt', output: 'PostgreSQL, MySQL, Firebase' },
  { cmd: '$ cat tools.txt', output: 'Git, GitHub, Tableau, GraphQL' },
  { cmd: '$ cat interests.txt', output: 'Full-Stack Development, AI/ML, Mobile Apps, System Design' },
  { cmd: '$ echo "Ready to build amazing things! 🚀"', output: 'Ready to build amazing things! 🚀' },
];

const TerminalApp = memo(() => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= skillLines.length * 2) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full p-4 font-mono text-[13px] overflow-auto"
      style={{ background: '#1e1e1e', color: '#f0f0f0' }}>
      <div className="mb-3 text-green-400 text-xs">Last login: {new Date().toDateString()} on ttys000</div>
      {skillLines.map((line, i) => (
        <div key={i}>
          {visibleLines > i * 2 && (
            <div className="text-green-400 mb-0.5">{line.cmd}</div>
          )}
          {visibleLines > i * 2 + 1 && (
            <div className="text-gray-300 mb-3 pl-2">{line.output}</div>
          )}
        </div>
      ))}
      {visibleLines >= skillLines.length * 2 && (
        <div className="text-green-400 flex items-center gap-1">
          $ <span className="w-2 h-4 bg-green-400 animate-pulse inline-block" />
        </div>
      )}
    </div>
  );
});

TerminalApp.displayName = 'TerminalApp';
export default TerminalApp;
