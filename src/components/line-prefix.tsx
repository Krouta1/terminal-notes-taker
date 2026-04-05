type LinePrefixProps = {
  timestamp: string;
};

const LinePrefix = ({ timestamp }: LinePrefixProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-xs font-semibold text-emerald-300">
        ›
      </span>
      <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] tracking-[0.18em] text-slate-400 uppercase">
        {timestamp}
      </span>
    </div>
  );
};

export default LinePrefix;
