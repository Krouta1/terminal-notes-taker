export const HOTKEYS = ['enter', 'arrowup', 'arrowdown'];
export const ALLOWED_COMMANDS = ['clear', 'help', 'list', 'add', 'delete'];
export const HELP_COMMANDS = [
  { command: '/clear', description: 'Clears the terminal' },
  { command: '/help', description: 'Shows this help message' },
  { command: '/list', description: 'Lists all notes with their IDs' },
  { command: '/add <note>', description: 'Saves a note to IndexedDB' },
  { command: '/delete <id>', description: 'Deletes a note from IndexedDB by ID' },
];
