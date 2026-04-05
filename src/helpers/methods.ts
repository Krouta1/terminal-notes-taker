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

export const createAtRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return `${diffSeconds} seconds ago`;
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${diffDays} days ago`;
};
