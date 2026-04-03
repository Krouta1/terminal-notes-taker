import { useLineStore } from '../states/line-store';
import { ALLOWED_COMMANDS } from './helpers';

export const runCommand = (input: string): boolean => {
  const trimmed = input.trim();
  if (!trimmed.startsWith('/')) return false;

  const cmd = trimmed.slice(1).toLowerCase();
  if (!ALLOWED_COMMANDS.includes(cmd)) {
    useLineStore.getState().addLine({
      id: crypto.randomUUID(),
      data: [`Unknown command: ${cmd}`],
      type: 'output',
      timestamp: new Date().toLocaleTimeString(),
      state: 'error',
    });
    return true;
  }

  switch (cmd) {
    case 'clear':
      useLineStore.getState().clearLines();
      return true;
    default:
      return false;
  }
};
