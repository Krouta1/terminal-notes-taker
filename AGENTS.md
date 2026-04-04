# Terminal-Style AI Notes App

## Project Overview

**Goal:**  
A React + TypeScript app with a terminal-like UI for local note-taking. Right now the project focuses on the shell experience, command parsing, and line rendering. Persistent note storage with IndexedDB is still planned, not implemented.

## Current Status

### Implemented

- Terminal-style UI centered on the page
- Keyboard interaction with `Enter`, `ArrowUp`, and `ArrowDown`
- Input history navigation for previously submitted commands
- `/clear` command to reset terminal output
- `/help` command to show available commands
- Error output for unknown slash commands

### Planned

- `/add <note>`
- `/list`
- `/delete <id>`
- `/search <keyword>`
- IndexedDB persistence via `idb`

---

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Zustand for terminal line state
- `react-hotkeys-hook` for keyboard shortcuts
- `clsx` installed for conditional styling
- `idb` planned but not yet integrated

---

## Commands

Commands must start with `/`.

| Command  | Status | Description                                       |
| -------- | ------ | ------------------------------------------------- |
| `/clear` | ✅     | Clears the terminal back to the initial greeting  |
| `/help`  | ✅     | Shows the available commands from `HELP_COMMANDS` |

Unknown commands render an output line with the `error` variant.

---

## Architecture

### State

- `src/states/line-store.ts`
  - Zustand store: `useLineStore`
  - Keeps the `lines` array
  - Exposes `addLine()` and `clearLines()`
  - Starts with a welcome output line

### Shared Types

- `src/helpers/types.ts`
  - `LineData`: `{ text?: string; values?: string[] }`
  - `Line`: terminal row model with `id`, `data`, `type`, `variant`, and `timestamp`
  - `LineVariant`: `'default' | 'error' | 'info'`

### Components

- `src/components/treminal.tsx` — main terminal container UI
- `src/components/lines.tsx` — renders terminal history and active input field
- `src/components/line-prefix.tsx` — renders the prompt symbol and timestamp
- `src/components/output.tsx` — renders output lines by variant and maps `values` for help/info lists

### Hook

- `src/hooks/useTerminalInput.ts`
  - Stores the current input as `LineData[]`
  - Focuses the input on updates
  - Wires keyboard shortcuts via `useHotkeys`
  - Supports command history navigation

### Helpers

- `src/helpers/helpers.ts`
  - `HOTKEYS`
  - `ALLOWED_COMMANDS`
  - `HELP_COMMANDS`
- `src/helpers/commands.ts`
  - `runCommand(input)` parses slash commands and pushes output into the store
- `src/helpers/hot-keys-methods.ts`
  - `onEnter`, `onArrowUp`, `onArrowDown`

---

## Current File Structure

```text
src/
  components/
    line-prefix.tsx     # Prompt symbol and timestamp
    lines.tsx           # Line history + active input row
    output.tsx          # Output renderer for default/error/info lines
    treminal.tsx        # Terminal shell wrapper
  helpers/
    commands.ts         # Command routing
    helpers.ts          # HOTKEYS, ALLOWED_COMMANDS, HELP_COMMANDS
    hot-keys-methods.ts # Keyboard handlers
    types.ts            # Shared line types
  hooks/
    useTerminalInput.ts # Input state and history handling
  states/
    line-store.ts       # Zustand store for terminal lines
  App.tsx
  main.tsx
```
