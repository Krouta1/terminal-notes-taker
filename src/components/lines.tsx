import { useLineStore } from '../states/line-store';
import { useTerminalInput } from '../hooks/useTerminalInput';
import LinePrefix from './line-prefix';
import Output from './output';

const Lines = () => {
  const lines = useLineStore(state => state.lines);
  const { input, setInput, inputRef } = useTerminalInput();

  return (
    <div className="font-mono text-sm" onClick={() => inputRef.current?.focus()}>
      {lines.map(line => (
        <div key={line.id} className="flex">
          <LinePrefix timestamp={line.timestamp} />
          {line.type === 'input' ? (
            <span className="whitespace-pre-wrap text-white">{line.text}</span>
          ) : (
            <Output text={line.text} items={line.items} variant={line.variant} />
          )}
        </div>
      ))}
      <div className="flex items-center">
        <span className="mr-1 text-green-400">&gt;</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 bg-transparent text-white caret-white outline-none"
          autoFocus
        />
      </div>
    </div>
  );
};

export default Lines;
