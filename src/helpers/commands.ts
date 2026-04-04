import { useLineStore } from '../states/line-store';
import { ALLOWED_COMMANDS, HELP_COMMANDS } from './helpers';
import { saveNoteToIndexedDB, getAllNotesFromIndexedDB } from './indexed-db';
import { addOutputLine } from './methods';

export const runCommand = (input: string): boolean => {
  const trimmed = input.trim();
  if (!trimmed.startsWith('/')) return false;

  const [rawCmd = '', ...args] = trimmed.slice(1).split(/\s+/);
  const cmd = rawCmd.toLowerCase();
  const note = args.join(' ').trim();

  if (!ALLOWED_COMMANDS.includes(cmd)) {
    addOutputLine(`Unknown command: ${cmd}`, 'error');
    return true;
  }

  switch (cmd) {
    case 'clear':
      useLineStore.getState().clearLines();
      return true;
    case 'help':
      addOutputLine(
        'Available commands:',
        'info',
        HELP_COMMANDS.map(({ command, description }) => `${command} — ${description}`),
      );
      return true;
    case 'list':
      void getAllNotesFromIndexedDB()
        .then(notes => {
          if (notes.length === 0) {
            addOutputLine('No notes found.', 'info');
          } else {
            addOutputLine(
              'Saved notes:',
              'info',
              notes.map(note => note.text),
            );
          }
        })
        .catch((error: unknown) => {
          const message = error instanceof Error ? error.message : 'Unknown error';
          addOutputLine(`Failed to retrieve notes: ${message}`, 'error');
        });

      return true;
    case 'add':
      if (!note) {
        addOutputLine('Usage: /add <note>', 'error');
        return true;
      }

      void saveNoteToIndexedDB(note)
        .then(() => {
          addOutputLine(`Saved note: ${note}`);
        })
        .catch((error: unknown) => {
          const message = error instanceof Error ? error.message : 'Unknown error';
          addOutputLine(`Failed to save note: ${message}`, 'error');
        });

      return true;
    default:
      return false;
  }
};
