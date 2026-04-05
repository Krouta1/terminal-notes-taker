import type { LineVariant } from '../helpers/types';

type OutputProps = {
  text: string;
  items?: string[];
  variant?: LineVariant;
};

const variantClassMap: Record<LineVariant, string> = {
  default: 'text-slate-100',
  error: 'rounded-xl border border-rose-500/25 bg-rose-500/10 px-3 py-2 text-rose-100',
  info: 'rounded-xl border border-cyan-500/25 bg-cyan-500/10 px-3 py-2 text-cyan-50',
};

const itemClassMap: Record<LineVariant, string> = {
  default: 'text-slate-300',
  error: 'text-rose-200',
  info: 'text-cyan-100',
};

const Output = ({ text, items, variant = 'default' }: OutputProps) => {
  return (
    <div className={`min-w-0 ${variantClassMap[variant]}`}>
      <div className="leading-6 wrap-break-word whitespace-pre-wrap">{text}</div>
      {items?.length ? (
        <div className="mt-2 space-y-1">
          {items.map(item => (
            <div key={item} className={`pl-3 wrap-break-word whitespace-pre-wrap ${itemClassMap[variant]}`}>
              • {item}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Output;
