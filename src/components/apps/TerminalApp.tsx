import { useState, useEffect, memo, useRef } from 'react';

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
  const [history, setHistory] = useState([
    { type: 'system', text: `Last login: ${new Date().toDateString()} on ttys000` },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [history]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmed = input.trim();
      if (trimmed.toLowerCase() === 'clear') {
        setHistory([
          { type: 'system', text: `Last login: ${new Date().toDateString()} on ttys000` },
        ]);
      } else {
        setHistory((prev) => [
          ...prev,
          { type: 'input', text: `$ ${trimmed}` },
          ...(
            trimmed.toLowerCase() === 'skills'
              ? skillLines.flatMap((line) => [
                  { type: 'cmd', text: line.cmd },
                  { type: 'output', text: line.output },
                ])
              : trimmed
                ? [{ type: 'output', text: `Command not found: ${trimmed}` }]
                : []
          ),
        ]);
      }
      setInput('');
    }
  };

  return (
    <div className="h-full p-4 font-mono text-[13px] overflow-auto"
      style={{ background: '#1e1e1e', color: '#f0f0f0' }}>
      {/* Command hint */}
      <div className="mb-2 text-xs text-gray-400 italic">Type <span className="text-green-300">skills</span> to view skills, <span className="text-green-300">clear</span> to clear the terminal.</div>
      {history.map((item, i) => {
        if (item.type === 'system') return <div key={i} className="mb-3 text-green-400 text-xs">{item.text}</div>;
        if (item.type === 'input') return <div key={i} className="text-green-400">{item.text}</div>;
        if (item.type === 'cmd') return <div key={i} className="text-green-400 mb-0.5">{item.text}</div>;
        if (item.type === 'output') return <div key={i} className="text-gray-300 mb-3 pl-2">{item.text}</div>;
        return null;
      })}
      <div className="text-green-400 flex items-center gap-1">
        $
        <input
          ref={inputRef}
          className="bg-transparent outline-none border-none text-inherit w-48"
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <span className="w-2 h-4 bg-green-400 animate-pulse inline-block" />
      </div>
    </div>
  );
});

TerminalApp.displayName = 'TerminalApp';
export default TerminalApp;
