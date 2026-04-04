// Types for Lines
export type LineVariant = 'default' | 'error' | 'info';

export type LineData = {
  text?: string;
  values?: string[];
};

export type Line = {
  id: string;
  data: LineData[];
  type: 'input' | 'output';
  variant?: LineVariant;
  timestamp: string;
};

export interface LineState {
  lines: Line[];
  addLine: (line: Line) => void;
  clearLines: () => void;
}
