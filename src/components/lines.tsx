import { useLineStore } from '../states/line-store';
import { useTerminalInput } from '../hooks/useTerminalInput';

const Lines = () => {
  const lines = useLineStore(state => state.lines);
  const { input, setInput, inputRef } = useTerminalInput();

  return (
    <div className="font-mono text-sm" onClick={() => inputRef.current?.focus()}>
      {lines.map(line => (
        <div key={line.id}>
          <span className="mr-1 text-green-400">&gt;</span>
          <span className="mr-1 text-gray-400">[{line.timestamp}]</span>
          <span className={line.variant === 'error' ? 'text-red-500' : 'text-white'}> {line.data.join('')}</span>
        </div>
      ))}
      <div className="flex items-center">
        <span className="mr-1 text-green-400">&gt;</span>
        <input
          ref={inputRef}
          value={input.join('')}
          onChange={e => setInput([e.target.value])}
          className="flex-1 bg-transparent text-white caret-white outline-none"
          autoFocus
        />
      </div>
    </div>
  );
};

export default Lines;
