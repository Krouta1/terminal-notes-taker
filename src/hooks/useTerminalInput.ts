import { useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useShallow } from 'zustand/shallow';
import { onArrowDown, onArrowUp, onEnter } from '../helpers/hot-keys-methods';
import { HOTKEYS } from '../helpers/helpers';
import type { LineData } from '../helpers/types';
import { useLineStore } from '../states/line-store';

export const useTerminalInput = () => {
  const lines = useLineStore(state => state.lines);
  const inputLines = useLineStore(useShallow(state => state.lines.filter(l => l.type === 'input')));

  const [input, setInput] = useState<LineData[]>([{ text: '' }]);
  const [_ignored, setNow] = useState(() => new Date().toLocaleTimeString());
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNow(new Date().toLocaleTimeString());
    inputRef.current?.focus();
  }, [lines]);

  useHotkeys(
    HOTKEYS,
    (event, handler) => {
      switch (handler.hotkey) {
        case 'enter':
          onEnter(input, setInput, setHistoryIndex);
          break;
        case 'arrowup':
          event.preventDefault();
          onArrowUp(historyIndex, inputLines, setHistoryIndex, setInput);
          break;
        case 'arrowdown':
          event.preventDefault();
          onArrowDown(historyIndex, inputLines, setHistoryIndex, setInput);
          break;
      }
    },
    { enableOnFormTags: ['INPUT'] },
    [input, historyIndex, inputLines],
  );

  return { input, setInput, inputRef };
};
