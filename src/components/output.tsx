import type { LineVariant } from '../helpers/types';

type OutputProps = {
  text: string;
  items?: string[];
  variant?: LineVariant;
};

const variantClassMap: Record<LineVariant, string> = {
  default: 'text-white',
  error: 'text-red-400',
  info: 'text-blue-400',
};

const itemClassMap: Record<LineVariant, string> = {
  default: 'text-white',
  error: 'text-red-300',
  info: 'text-blue-300',
};

const Output = ({ text, items, variant = 'default' }: OutputProps) => {
  return (
    <div className={variantClassMap[variant]}>
      <div className="whitespace-pre-wrap">{text}</div>
      {items?.map(item => (
        <div key={item} className={`${itemClassMap[variant]}`}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default Output;
