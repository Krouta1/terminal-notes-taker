import { create } from 'zustand';

type Line = {
  id: string;
  data: string[];
  type: 'input' | 'output';
  variant?: 'default' | 'error';
  timestamp: string;
};

interface TerminalState {
  lines: Line[];
  addLine: (line: Line) => void;
  clearLines: () => void;
}

const lines: Line[] = [
  {
    id: crypto.randomUUID(),
    data: ['Welcome to Notes. Type help to see available commands.'],
    type: 'output',
    variant: 'default',
    timestamp: new Date().toLocaleTimeString(),
  },
];

export const useLineStore = create<TerminalState>(set => ({
  lines,
  addLine: line => set(state => ({ lines: [...state.lines, line] })),
  clearLines: () => set({ lines }),
}));
