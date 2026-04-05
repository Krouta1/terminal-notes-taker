# Terminal-Style AI Notes App

## Project Overview

**Goal:**  
A React + TypeScript app with a terminal-like UI for local, browser-based note-taking. The app now supports persistent note storage in IndexedDB and a slash-command workflow for creating, editing, tagging, searching, exporting, and importing notes.

## Current Status

### Implemented

- Terminal-style UI centered on the page
- Keyboard interaction with `Enter`, `ArrowUp`, and `ArrowDown`
- Input history navigation for previously submitted commands
- Persistent local note storage via browser `IndexedDB`
- Relative timestamp display for saved notes
- Tag support for notes
- JSON export/import for backups or migration
- Error/info/default output variants in the terminal

### Supported Commands

Commands must start with `/`.

| Command                       | Status | Description                                                   |
| ----------------------------- | ------ | ------------------------------------------------------------- |
| `/clear`                      | ✅     | Clears the terminal back to the initial greeting              |
| `/help`                       | ✅     | Shows the available commands from `HELP_COMMANDS`             |
| `/list`                       | ✅     | Lists all saved notes with IDs, tags, and relative timestamps |
| `/add <note>`                 | ✅     | Saves a note to IndexedDB                                     |
| `/delete <id>`                | ✅     | Deletes a note by ID                                          |
| `/edit <id> <note>`           | ✅     | Updates the text of a saved note                              |
| `/tag <id> <tag1> [tag2 ...]` | ✅     | Adds one or more tags to a saved note                         |
| `/search <query>`             | ✅     | Searches note text and tags                                   |
| `/export`                     | ✅     | Exports all notes as a JSON file                              |
| `/import`                     | ✅     | Imports notes from a JSON file                                |

Unknown slash commands render an output line with the `error` variant.

### Current Scope

- Local-only storage; no backend or cloud sync
- Single-user, browser session app
- Terminal interaction is the primary UX

---

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Zustand for terminal line state
- `react-hotkeys-hook` for keyboard shortcuts
- Native browser `IndexedDB` APIs for persistence
- `clsx` available for conditional styling

---

## Data Model

### Notes

- `src/helpers/indexed-db.ts`
  - `NoteRecord`: `{ id: string; text: string; createdAt: string; tags: string[] }`
  - Supports save, list, edit, delete, import, and tag updates

### Terminal Lines

- `src/helpers/types.ts`
  - `InputLine` — terminal input rows
  - `OutputLine` — rendered output rows with optional `items`
  - `Line` — union of input and output rows
  - `LineVariant` — `'default' | 'error' | 'info'`

---

## Architecture

### State

- `src/states/line-store.ts`
  - Zustand store: `useLineStore`
  - Keeps the terminal `lines` array
  - Exposes `addLine()` and `clearLines()`
  - Starts with a welcome output line

### Components

- `src/components/treminal.tsx` — main terminal container UI
- `src/components/lines.tsx` — renders terminal history and active input field
- `src/components/line-prefix.tsx` — renders the prompt symbol and timestamp
- `src/components/output.tsx` — renders output lines by variant and optional list items

### Hook

- `src/hooks/useTerminalInput.ts`
  - Tracks the active input string
  - Focuses the input after line updates
  - Wires keyboard shortcuts via `useHotkeys`
  - Supports command history navigation

### Helpers

- `src/helpers/helpers.ts`
  - `HOTKEYS`
  - `ALLOWED_COMMANDS`
  - `HELP_COMMANDS`
- `src/helpers/commands.ts`
  - `runCommand(input)` parses slash commands and routes note actions
  - Handles file picking + JSON reading for `/import`
- `src/helpers/indexed-db.ts`
  - Encapsulates IndexedDB CRUD and tag persistence
- `src/helpers/methods.ts`
  - `addOutputLine()`
  - `createAtRelativeTime()`
  - `normalizeNoteTags()` / `formatNoteTags()`
  - `normalizeImportedNotes()` / `normalizeStoredNote()`
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
    commands.ts         # Slash-command routing
    helpers.ts          # HOTKEYS, ALLOWED_COMMANDS, HELP_COMMANDS
    hot-keys-methods.ts # Keyboard handlers
    indexed-db.ts       # IndexedDB note persistence
    methods.ts          # Output, time, import, and tag helpers
    types.ts            # Shared terminal line types
  hooks/
    useTerminalInput.ts # Input state and history handling
  states/
    line-store.ts       # Zustand store for terminal lines
  App.tsx
  main.tsx
```
