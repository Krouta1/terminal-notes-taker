import { create } from 'zustand';
import type { Line, LineState } from '../helpers/types';

const initialLines: Line[] = [
  {
    id: crypto.randomUUID(),
    text: 'Welcome to Terminal Notes Taker! Type /help to see available commands.',
    type: 'output',
    variant: 'default',
    timestamp: new Date().toLocaleTimeString(),
  },
];

export const useLineStore = create<LineState>(set => ({
  lines: initialLines,
  addLine: line => set(state => ({ lines: [...state.lines, line] })),
  clearLines: () => set({ lines: initialLines }),
}));
