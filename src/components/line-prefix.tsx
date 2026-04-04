type LinePrefixProps = {
  timestamp: string;
};

const LinePrefix = ({ timestamp }: LinePrefixProps) => {
  return (
    <>
      <span className="mr-1 text-green-400">&gt;</span>
      <span className="mr-1 text-gray-400">[{timestamp}]</span>
    </>
  );
};

export default LinePrefix;
