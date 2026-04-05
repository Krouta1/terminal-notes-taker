# Terminal Notes Taker

A modern **terminal-style note-taking app** built with **React, TypeScript, and Vite**.

It lets you create and manage notes with simple slash commands in a clean, keyboard-first interface. Notes are stored locally in the browser using **IndexedDB**, so no backend is required.

---

## ✨ What this project is about

`Terminal Notes Taker` is a local-first productivity app designed for people who like fast workflows and minimal friction.

Instead of clicking through forms, you interact with your notes through commands such as:

- `/add`
- `/list`
- `/edit`
- `/tag`
- `/search`
- `/export`
- `/import`

The UI combines a terminal-inspired workspace with a more modern layout so it feels both lightweight and easy to navigate.

---

## 🚀 Features

- **Terminal-style interface** for quick note input
- **Modern dark UI** with a cleaner landing layout
- **IndexedDB persistence** for local browser storage
- **Edit and delete** existing notes
- **Tag notes** for better organization
- **Search by text or tags**
- **Export notes to JSON** for backup
- **Import notes from JSON** to restore or migrate data
- **Keyboard-friendly workflow** with command history navigation

---

## 🧰 Available Commands

| Command                       | Description                       |
| ----------------------------- | --------------------------------- |
| `/help`                       | Show all supported commands       |
| `/clear`                      | Clear the terminal output         |
| `/list`                       | List all saved notes              |
| `/add <note>`                 | Save a new note                   |
| `/delete <id>`                | Delete a note by ID               |
| `/edit <id> <note>`           | Update an existing note           |
| `/tag <id> <tag1> [tag2 ...]` | Add one or more tags to a note    |
| `/search <query>`             | Search notes by text or tags      |
| `/export`                     | Download all notes as a JSON file |
| `/import`                     | Import notes from a JSON file     |

---

## 🛠 Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **Zustand** for state management
- **react-hotkeys-hook** for keyboard shortcuts
- **IndexedDB** for persistent local storage

---

## 📦 Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start the development server

```bash
pnpm dev
```

### 3. Build for production

```bash
pnpm build
```

---

## 💡 Example Usage

```text
/add Buy oat milk
/list
/tag 123abc groceries urgent
/search groceries
/edit 123abc Buy oat milk and bananas
/export
```

---

## 🗂 Project Structure

```text
src/
  components/         # Terminal UI and page components
  helpers/            # Command logic, IndexedDB helpers, shared utilities
  hooks/              # Input and keyboard behavior
  states/             # Zustand store for terminal lines
```

---

## 🎯 Project Goals

This project focuses on:

- making note-taking feel fast and lightweight
- keeping everything local and simple
- blending a terminal aesthetic with a more polished modern UI
- creating a small but useful productivity tool without backend complexity

---

## 📌 Notes

- All data is stored locally in your browser.
- There is currently **no cloud sync or backend**.
- Exporting your notes is recommended if you want a backup.

---

## License

This project is open for learning, experimentation, and improvement.
