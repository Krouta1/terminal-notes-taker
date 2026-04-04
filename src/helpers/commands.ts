import { useLineStore } from '../states/line-store';
import { ALLOWED_COMMANDS, HELP_COMMANDS } from './helpers';

export const runCommand = (input: string): boolean => {
  const trimmed = input.trim();
  if (!trimmed.startsWith('/')) return false;

  const cmd = trimmed.slice(1).toLowerCase();
  if (!ALLOWED_COMMANDS.includes(cmd)) {
    useLineStore.getState().addLine({
      id: crypto.randomUUID(),
      data: [{ text: `Unknown command: ${cmd}` }],
      type: 'output',
      timestamp: new Date().toLocaleTimeString(),
      variant: 'error',
    });
    return true;
  }

  switch (cmd) {
    case 'clear':
      useLineStore.getState().clearLines();
      return true;
    case 'help':
      useLineStore.getState().addLine({
        id: crypto.randomUUID(),
        data: [
          {
            text: 'Available commands:',
            values: HELP_COMMANDS.map(({ command, description }) => `${command} — ${description}`),
          },
        ],
        type: 'output',
        timestamp: new Date().toLocaleTimeString(),
        variant: 'info',
      });
      return true;
    default:
      return false;
  }
};
