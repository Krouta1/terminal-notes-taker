import { runCommand } from './commands';
import { useLineStore } from '../states/line-store';

type SetInput = (value: string[]) => void;
type SetIndex = (value: number) => void;

export const onEnter = (input: string[], setInput: SetInput, setHistoryIndex: SetIndex) => {
  if (!input.join('').trim()) return;
  const handled = input.join('').trim().startsWith('/') && runCommand(input.join(''));
  if (!handled) {
    useLineStore.getState().addLine({
      id: crypto.randomUUID(),
      data: [...input],
      type: 'input',
      timestamp: new Date().toLocaleTimeString(),
      variant: 'default',
    });
  }
  setInput(['']);
  setHistoryIndex(-1);
};

export const onArrowUp = (
  historyIndex: number,
  inputLines: { data: string[] }[],
  setHistoryIndex: SetIndex,
  setInput: SetInput,
) => {
  const nextIndex = historyIndex + 1;
  if (nextIndex < inputLines.length) {
    setHistoryIndex(nextIndex);
    setInput(inputLines[inputLines.length - 1 - nextIndex].data);
  }
};

export const onArrowDown = (
  historyIndex: number,
  inputLines: { data: string[] }[],
  setHistoryIndex: SetIndex,
  setInput: SetInput,
) => {
  const prevIndex = historyIndex - 1;
  if (prevIndex < 0) {
    setHistoryIndex(-1);
    setInput(['']);
  } else {
    setHistoryIndex(prevIndex);
    setInput(inputLines[inputLines.length - 1 - prevIndex].data);
  }
};
