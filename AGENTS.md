# Terminal-Style AI Notes App

## Project Overview

**Goal:**  
A React + TypeScript app that works like a terminal interface to manage notes locally using IndexedDB. Users can type commands to add, list, delete, and search notes. The app should work offline and have a clean, minimalistic terminal UI.

**Stack:**

- Vite + React + TypeScript
- [idb](https://www.npmjs.com/package/idb) (IndexedDB wrapper) — not yet integrated
- Tailwind CSS for styling
- react-hotkeys-hook for keyboard shortcuts
- Zustand for state management
- clsx for conditional classnames

---

## Commands

Commands are prefixed with `/`. Unknown commands show an error output line.

| Command  | Description                               |
| -------- | ----------------------------------------- |
| `/clear` | Clear terminal output                     |
| `/help`  | Show all commands — _not yet implemented_ |

Planned:

| Command             | Description       |
| ------------------- | ----------------- |
| `/add <note>`       | Add a new note    |
| `/list`             | List all notes    |
| `/delete <id>`      | Delete note by ID |
| `/search <keyword>` | Search notes      |

---

## Architecture

### State

- `src/states/line-store.ts` — Zustand store (`useLineStore`). Manages the `lines` array. Each `Line` has `text`, `type` (`input` | `output`), `timestamp`, and `state` (`default` | `error` | `success`). `clearLines()` resets to the initial greeting line.

### Components

- `src/components/treminal.tsx` — Shell component, renders `<Lines />` inside a styled terminal box.
- `src/components/lines.tsx` — Renders all lines from the store and the active input row. Uses `useTerminalInput` for all logic.

### Hooks

- `src/hooks/useTerminalInput.ts` — Owns local input state (`input`, `historyIndex`, `now`), wires up `useHotkeys`, handles focus and clock sync on line changes.

### Helpers

- `src/helpers/helpers.ts` — Constants: `HOTKEYS` (key list for `useHotkeys`), `ALLOWED_COMMANDS` (valid command names).
- `src/helpers/commands.ts` — `runCommand(input)`: strips `/`, matches against `ALLOWED_COMMANDS`, executes or outputs an error. Returns `true` if the input was consumed as a command.
- `src/helpers/hot-keys-methods.ts` — Pure functions for each hotkey case: `onEnter`, `onArrowUp`, `onArrowDown`. Called from the switch in `useTerminalInput`.

---

## File Structure

```
src/
  components/
    lines.tsx           # Renders line history + active input
    treminal.tsx        # Terminal wrapper UI
  helpers/
    commands.ts         # Command routing and execution
    helpers.ts          # HOTKEYS and ALLOWED_COMMANDS constants
    hot-keys-methods.ts # onEnter / onArrowUp / onArrowDown logic
  hooks/
    useTerminalInput.ts # Input state, hotkeys, history navigation
  states/
    line-store.ts       # Zustand line store (useLineStore)
  App.tsx
  main.tsx
```
