# Terminal-Style AI Notes App

## Project Overview

**Goal:**  
A React + TypeScript app that works like a terminal interface to manage notes locally using IndexedDB. Users can type commands to add, list, delete, and search notes. The app should work offline and have a clean, minimalistic terminal UI.

**Stack:**

- Vite + React + TypeScript
- [idb](https://www.npmjs.com/package/idb) (IndexedDB wrapper)
- Tailwind CSS for styling
- react-hotkeys-hook for keyboard shortcuts
- Zustand for state managment

---

## Basic Features

| Command            | Description           |
| ------------------ | --------------------- |
| `add <note>`       | Add a new note        |
| `list`             | List all notes        |
| `delete <id>`      | Delete note by ID     |
| `search <keyword>` | Search notes          |
| `clear`            | Clear terminal output |
| `help`             | Show all commands     |

**Optional AI Feature:**

- Suggest note titles or summaries using AI completions (placeholder function for now)

---

## File Structure
