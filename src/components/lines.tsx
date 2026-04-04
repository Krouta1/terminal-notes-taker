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
        <div key={line.id}>
          <LinePrefix timestamp={line.timestamp} />
          {line.type === 'input' ? (
            <span>{line.data.map(item => item.text ?? '').join('')}</span>
          ) : (
            <Output data={line.data} variant={line.variant} />
          )}
        </div>
      ))}
      <div className="flex items-center">
        <span className="mr-1 text-green-400">&gt;</span>
        <input
          ref={inputRef}
          value={input.map(item => item.text ?? '').join('')}
          onChange={e => setInput([{ text: e.target.value }])}
          className="flex-1 bg-transparent text-white caret-white outline-none"
          autoFocus
        />
      </div>
    </div>
  );
};

export default Lines;
