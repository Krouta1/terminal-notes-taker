import { create } from 'zustand';

type Line = {
  text: string;
  type: 'input' | 'output';
  timestamp: string;
  state: 'default' | 'error' | 'success';
};

interface TerminalState {
  lines: Line[];
  addLine: (line: Line) => void;
  clearLines: () => void;
}

const lines: Line[] = [
  {
    text: 'Welcome to Notes. Type help to see available commands.',
    type: 'output',
    timestamp: new Date().toLocaleTimeString(),
    state: 'default',
  },
];

export const useLineStore = create<TerminalState>(set => ({
  lines,
  addLine: line => set(state => ({ lines: [...state.lines, line] })),
  clearLines: () => set({ lines }),
}));
