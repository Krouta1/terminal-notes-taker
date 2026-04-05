import { useLineStore } from '../states/line-store';
import type { LineVariant } from './types';

export const addOutputLine = (text: string, variant: LineVariant = 'default', items?: string[]) => {
  useLineStore.getState().addLine({
    id: crypto.randomUUID(),
    text,
    items,
    type: 'output',
    timestamp: new Date().toLocaleTimeString(),
    variant,
  });
};

export const stripWrappingQuotes = (value: string): string => value.replace(/^['"]|['"]$/g, '');
