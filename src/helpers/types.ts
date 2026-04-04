export type LineVariant = 'default' | 'error' | 'info';

type BaseLine = {
  id: string;
  timestamp: string;
};

export type InputLine = BaseLine & {
  type: 'input';
  text: string;
};

export type OutputLine = BaseLine & {
  type: 'output';
  text: string;
  items?: string[];
  variant?: LineVariant;
};

export type Line = InputLine | OutputLine;

export interface LineState {
  lines: Line[];
  addLine: (line: Line) => void;
  clearLines: () => void;
}
