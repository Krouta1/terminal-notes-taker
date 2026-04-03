import { create } from 'zustand';

type Line = { text: string; type: 'input' | 'output' };

interface TerminalState {
  lines: Line[];
  addLine: (line: Line) => void;
  clearLines: () => void;
}

export const useTerminalStore = create<TerminalState>(set => ({
  lines: [
    {
      text: 'Welcome to Notes. Type help to see available commands.',
      type: 'output',
    },
  ],
  addLine: line => set(state => ({ lines: [...state.lines, line] })),
  clearLines: () => set({ lines: [] }),
}));
