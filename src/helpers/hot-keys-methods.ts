import { runCommand } from './commands';
import { useLineStore } from '../states/line-store';
import type { InputLine } from './types';

type SetInput = (value: string) => void;
type SetIndex = (value: number) => void;

export const onEnter = (input: string, setInput: SetInput, setHistoryIndex: SetIndex) => {
  const trimmedInput = input.trim();

  if (!trimmedInput) {
    return;
  }

  useLineStore.getState().addLine({
    id: crypto.randomUUID(),
    text: input,
    type: 'input',
    timestamp: new Date().toLocaleTimeString(),
  });

  void runCommand(input);
  setInput('');
  setHistoryIndex(-1);
};

export const onArrowUp = (
  historyIndex: number,
  inputLines: InputLine[],
  setHistoryIndex: SetIndex,
  setInput: SetInput,
) => {
  const nextIndex = historyIndex + 1;

  if (nextIndex < inputLines.length) {
    setHistoryIndex(nextIndex);
    setInput(inputLines[inputLines.length - 1 - nextIndex].text);
  }
};

export const onArrowDown = (
  historyIndex: number,
  inputLines: InputLine[],
  setHistoryIndex: SetIndex,
  setInput: SetInput,
) => {
  const prevIndex = historyIndex - 1;

  if (prevIndex < 0) {
    setHistoryIndex(-1);
    setInput('');
  } else {
    setHistoryIndex(prevIndex);
    setInput(inputLines[inputLines.length - 1 - prevIndex].text);
  }
};
