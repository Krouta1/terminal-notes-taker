export const HOTKEYS = ['enter', 'arrowup', 'arrowdown'];
export const ALLOWED_COMMANDS = ['clear', 'help', 'list', 'add', 'delete', 'edit', 'search', 'export'];
export const HELP_COMMANDS = [
  { command: '/clear', description: 'Clears the terminal' },
  { command: '/help', description: 'Shows this help message' },
  { command: '/list', description: 'Lists all notes with their IDs' },
  { command: '/add <note>', description: 'Saves a note to IndexedDB' },
  { command: '/delete <id>', description: 'Deletes a note from IndexedDB by ID' },
  { command: '/edit <id> <note>', description: 'Edits a saved note by ID' },
  { command: '/search <query>', description: 'Searches notes for a query' },
  { command: '/export', description: 'Exports all notes as a JSON file' },
];
