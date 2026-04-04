import type { LineData, LineVariant } from '../helpers/types';

type OutputProps = {
  data: LineData[];
  variant?: LineVariant;
};

const Output = ({ data, variant = 'default' }: OutputProps) => {
  return (
    <>
      {variant === 'error' && <span className="text-red-400">{data.map(d => d.text).join('')}</span>}
      {variant === 'default' && <span className="text-white">{data.map(d => d.text).join('')}</span>}
      {variant === 'info' && (
        <div className="text-blue-400">
          {data.map((d, index) => (
            <div key={`${d.text ?? 'info'}-${index}`}>
              {d.text && <div>{d.text}</div>}
              {d.values?.map(value => (
                <div key={value} className="ml-4 text-blue-300">
                  {value}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Output;
