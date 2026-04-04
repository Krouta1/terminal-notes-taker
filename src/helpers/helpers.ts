export const HOTKEYS = ['enter', 'arrowup', 'arrowdown'];
export const ALLOWED_COMMANDS = ['clear', 'help', 'list', 'add'];
export const HELP_COMMANDS = [
  { command: '/clear', description: 'Clears the terminal' },
  { command: '/help', description: 'Shows this help message' },
  { command: '/list', description: 'Lists all notes' },
  { command: '/add <note>', description: 'Saves a note to IndexedDB' },
];
