import { useEffect, useRef, useState } from 'react';
import { useTerminalStore } from '../states/terminal-state';

const Lines = () => {
  const { lines, addLine } = useTerminalStore();
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [lines]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      addLine({ text: input, type: 'input' });
      setInput('');
    }
  };

  return (
    <div
      className="font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line, i) => (
        <div key={i}>
          <span className="mr-1 text-green-400">&gt;</span>
          {line.text}
        </div>
      ))}
      <div className="flex items-center">
        <span className="mr-1 text-green-400">&gt;</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-white caret-white outline-none"
          autoFocus
        />
      </div>
    </div>
  );
};

export default Lines;
