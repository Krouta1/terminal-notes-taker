import Lines from './lines';

const terminalHighlights = [
  { label: 'Quick capture', value: '/add' },
  { label: 'Smart search', value: '/search' },
  { label: 'Organize', value: '/tag' },
];

const Terminal = () => {
  return (
    <section className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/85 shadow-[0_30px_90px_-45px_rgba(15,23,42,1)] backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-900/80 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-100">notes-terminal</p>
            <p className="text-xs text-slate-400">Keyboard-first workspace</p>
          </div>
        </div>

        <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
          local mode
        </div>
      </div>

      <div className="grid gap-3 border-b border-white/10 bg-slate-950/70 px-4 py-3 sm:grid-cols-3 sm:px-5">
        {terminalHighlights.map(item => (
          <div key={item.label} className="rounded-2xl border border-white/5 bg-white/5 p-3">
            <p className="text-xs tracking-[0.2em] text-slate-400 uppercase">{item.label}</p>
            <p className="mt-1 text-sm font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="h-[28rem] overflow-y-auto px-3 py-4 sm:px-4">
        <Lines />
      </div>
    </section>
  );
};

export default Terminal;
