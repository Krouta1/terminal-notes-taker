import { useLineStore } from '../states/line-store';
import { ALLOWED_COMMANDS, HELP_COMMANDS } from './helpers';
import {
  saveNoteToIndexedDB,
  getAllNotesFromIndexedDB,
  deleteNoteFromIndexedDB,
  editNoteInIndexedDB,
  importNotesToIndexedDB,
} from './indexed-db';
import { addOutputLine, createAtRelativeTime, stripWrappingQuotes } from './methods';

const pickImportFile = (): Promise<File | null> =>
  new Promise(resolve => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.style.display = 'none';

    input.onchange = () => {
      const [file] = Array.from(input.files ?? []);
      input.remove();
      resolve(file ?? null);
    };

    document.body.appendChild(input);
    input.click();
  });

const readFileAsText = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
        return;
      }

      reject(new Error(`Failed to read file "${file.name}".`));
    };

    reader.onerror = () => reject(reader.error ?? new Error(`Failed to read file "${file.name}".`));
    reader.readAsText(file);
  });

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
              notes.map(({ id, text, createdAt }) => `[${id}] ${text} (${createAtRelativeTime(new Date(createdAt))})`),
            );
          }
        })
        .catch((error: unknown) => {
          const message = error instanceof Error ? error.message : 'Unknown error';
          addOutputLine(`Failed to retrieve notes: ${message}`, 'error');
        });

      return true;
    case 'add': {
      if (!note) {
        addOutputLine('Usage: /add <note>');
        return true;
      }

      const noteText = stripWrappingQuotes(note);

      void saveNoteToIndexedDB(noteText)
        .then(savedNote => {
          addOutputLine(`Saved note [${savedNote.id}]: ${savedNote.text}`);
        })
        .catch((error: unknown) => {
          const message = error instanceof Error ? error.message : 'Unknown error';
          addOutputLine(`Failed to save note: ${message}`, 'error');
        });

      return true;
    }
    case 'delete': {
      if (!note) {
        addOutputLine('Usage: /delete <id>', 'error');
        return true;
      }

      const noteId = stripWrappingQuotes(note);

      void deleteNoteFromIndexedDB(noteId)
        .then(deletedNote => {
          addOutputLine(`Deleted note [${deletedNote.id}]: ${deletedNote.text}`);
        })
        .catch((error: unknown) => {
          const message = error instanceof Error ? error.message : 'Unknown error';
          addOutputLine(`Failed to delete note: ${message}`, 'error');
        });
      return true;
    }
    case 'edit': {
      const [rawNoteId = '', ...textParts] = args;
      const noteId = stripWrappingQuotes(rawNoteId);
      const newText = stripWrappingQuotes(textParts.join(' ').trim());

      if (!noteId || !newText) {
        addOutputLine('Usage: /edit <id> <new note text>');
        return true;
      }

      void editNoteInIndexedDB(noteId, newText)
        .then(editedNote => {
          addOutputLine(`Edited note [${editedNote.id}]: ${editedNote.text}`);
        })
        .catch((error: unknown) => {
          const message = error instanceof Error ? error.message : 'Unknown error';
          addOutputLine(`Failed to edit note: ${message}`, 'error');
        });
      return true;
    }
    case 'search': {
      if (!note) {
        addOutputLine('Usage: /search <query>');
        return true;
      }

      const query = stripWrappingQuotes(note).toLowerCase();

      void getAllNotesFromIndexedDB()
        .then(notes => {
          const results = notes.filter(({ text }) => text.toLowerCase().includes(query));
          if (results.length === 0) {
            addOutputLine('No matching notes found.', 'info');
          } else {
            addOutputLine(
              `Search results for "${query}":`,
              'info',
              results.map(({ id, text }) => `[${id}] ${text}`),
            );
          }
        })
        .catch((error: unknown) => {
          const message = error instanceof Error ? error.message : 'Unknown error';
          addOutputLine(`Failed to search notes: ${message}`, 'error');
        });

      return true;
    }
    case 'export': {
      void getAllNotesFromIndexedDB()
        .then(notes => {
          const dataStr = JSON.stringify(notes, null, 2);
          const blob = new Blob([dataStr], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `notes_export_${new Date().toISOString()}.json`;
          a.click();
          URL.revokeObjectURL(url);
        })
        .catch((error: unknown) => {
          const message = error instanceof Error ? error.message : 'Unknown error';
          addOutputLine(`Failed to export notes: ${message}`, 'error');
        });

      return true;
    }
    case 'import': {
      addOutputLine('Select a JSON file to import...', 'info');

      void pickImportFile()
        .then(file => {
          if (!file) {
            addOutputLine('Import canceled.', 'info');
            return null;
          }

          return readFileAsText(file).then(contents => ({ contents, fileName: file.name }));
        })
        .then(result => {
          if (!result) {
            return;
          }

          const parsed = JSON.parse(result.contents) as unknown;

          return importNotesToIndexedDB(parsed).then(importedNotes => {
            const noteLabel = importedNotes.length === 1 ? 'note' : 'notes';
            addOutputLine(`Imported ${importedNotes.length} ${noteLabel} from "${result.fileName}".`);
          });
        })
        .catch((error: unknown) => {
          const message = error instanceof Error ? error.message : 'Unknown error';
          addOutputLine(`Failed to import notes: ${message}`, 'error');
        });

      return true;
    }
    default:
      return false;
  }
};
