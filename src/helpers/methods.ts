import { useLineStore } from '../states/line-store';
import type { NoteRecord } from './indexed-db';
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

export const normalizeNoteTags = (value: unknown): string[] => {
  const rawTags =
    typeof value === 'string'
      ? value.split(/[\s,]+/)
      : Array.isArray(value)
        ? value.flatMap(item => (typeof item === 'string' ? item.split(/[\s,]+/) : []))
        : [];

  return [
    ...new Set(rawTags.map(tag => stripWrappingQuotes(tag).trim().toLowerCase().replace(/^#+/, '')).filter(Boolean)),
  ];
};

export const formatNoteTags = (tags: string[]): string => (tags.length > 0 ? tags.map(tag => `#${tag}`).join(' ') : '');

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

export const normalizeImportedNotes = (payload: unknown): NoteRecord[] => {
  const rawNotes = Array.isArray(payload)
    ? payload
    : typeof payload === 'object' && payload !== null && Array.isArray((payload as { notes?: unknown[] }).notes)
      ? (payload as { notes: unknown[] }).notes
      : null;

  if (!rawNotes) {
    throw new Error('Import file must contain a JSON array of notes.');
  }

  const normalizedNotes = rawNotes.flatMap(item => {
    if (typeof item !== 'object' || item === null) {
      return [];
    }

    const { id, text, createdAt, tags } = item as Partial<NoteRecord>;

    if (typeof text !== 'string' || text.trim().length === 0) {
      return [];
    }

    const safeCreatedAt =
      typeof createdAt === 'string' && !Number.isNaN(Date.parse(createdAt))
        ? new Date(createdAt).toISOString()
        : new Date().toISOString();

    return [
      {
        id: typeof id === 'string' && id.trim().length > 0 ? id.trim() : crypto.randomUUID(),
        text: text.trim(),
        createdAt: safeCreatedAt,
        tags: normalizeNoteTags(tags),
      },
    ];
  });

  if (normalizedNotes.length === 0) {
    throw new Error('No valid notes found in the selected file.');
  }

  return normalizedNotes;
};

export const normalizeStoredNote = (note: Omit<NoteRecord, 'tags'> & { tags?: unknown }): NoteRecord => ({
  ...note,
  tags: normalizeNoteTags(note.tags),
});
