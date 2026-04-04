import { runCommand } from './commands';
import { useLineStore } from '../states/line-store';
import type { LineData } from './types';

type SetInput = (value: LineData[]) => void;
type SetIndex = (value: number) => void;

export const onEnter = (input: LineData[], setInput: SetInput, setHistoryIndex: SetIndex) => {
  if (
    !input
      .map(d => d.text)
      .join('')
      .trim()
  )
    return;
  const handled =
    input
      .map(d => d.text)
      .join('')
      .trim()
      .startsWith('/') && runCommand(input.map(d => d.text).join(''));
  if (!handled) {
    useLineStore.getState().addLine({
      id: crypto.randomUUID(),
      data: [{ text: input.map(d => d.text).join('') }],
      type: 'input',
      timestamp: new Date().toLocaleTimeString(),
      variant: 'default',
    });
  }
  setInput([{ text: '' }]);
  setHistoryIndex(-1);
};

export const onArrowUp = (
  historyIndex: number,
  inputLines: { data: LineData[] }[],
  setHistoryIndex: SetIndex,
  setInput: SetInput,
) => {
  const nextIndex = historyIndex + 1;
  if (nextIndex < inputLines.length) {
    setHistoryIndex(nextIndex);
    setInput(inputLines[inputLines.length - 1 - nextIndex].data.map(d => ({ text: d.text })));
  }
};

export const onArrowDown = (
  historyIndex: number,
  inputLines: { data: LineData[] }[],
  setHistoryIndex: SetIndex,
  setInput: SetInput,
) => {
  const prevIndex = historyIndex - 1;
  if (prevIndex < 0) {
    setHistoryIndex(-1);
    setInput([{ text: '' }]);
  } else {
    setHistoryIndex(prevIndex);
    setInput(inputLines[inputLines.length - 1 - prevIndex].data.map(d => ({ text: d.text })));
  }
};
