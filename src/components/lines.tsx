import { useLineStore } from '../states/line-store';
import { useTerminalInput } from '../hooks/useTerminalInput';
import LinePrefix from './line-prefix';
import Output from './output';

const Lines = () => {
  const lines = useLineStore(state => state.lines);
  const { input, setInput, inputRef } = useTerminalInput();

  return (
    <div className="font-mono text-sm text-slate-100" onClick={() => inputRef.current?.focus()}>
      <div className="space-y-2">
        {lines.map(line => (
          <div
            key={line.id}
            className="flex items-start gap-3 rounded-2xl px-2 py-1.5 transition-colors hover:bg-white/5"
          >
            <div className="shrink-0 pt-0.5">
              <LinePrefix timestamp={line.timestamp} />
            </div>

            <div className="min-w-0 flex-1">
              {line.type === 'input' ? (
                <span className="wrap-break-word whitespace-pre-wrap text-white">{line.text}</span>
              ) : (
                <Output text={line.text} items={line.items} variant={line.variant} />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-black/30 px-3 py-2 shadow-inner shadow-black/20">
        <span className="text-emerald-300">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 bg-transparent text-sm text-white caret-emerald-300 outline-none placeholder:text-slate-500"
          placeholder="Try /help, /add Buy oat milk, or /tag <id> work"
          autoFocus
        />
      </div>
    </div>
  );
};

export default Lines;
