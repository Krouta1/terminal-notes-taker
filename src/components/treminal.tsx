import Lines from './lines';

const Terminal = () => {
  return (
    <div className="mx-auto h-96 w-2/3 overflow-y-auto scroll-auto rounded-2xl bg-black p-4 text-white">
      <div>
        <Lines />
      </div>
    </div>
  );
};

export default Terminal;
