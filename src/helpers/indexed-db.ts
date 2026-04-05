import { normalizeImportedNotes, normalizeNoteTags, normalizeStoredNote } from './methods';

const DB_NAME = 'terminal-notes-taker';
const STORE_NAME = 'notes';

export type NoteRecord = {
  id: string;
  text: string;
  createdAt: string;
  tags: string[];
};

const openNotesDatabase = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Failed to open IndexedDB.'));
  });

export const saveNoteToIndexedDB = async (note: string): Promise<NoteRecord> => {
  const db = await openNotesDatabase();
  const noteRecord: NoteRecord = normalizeStoredNote({
    id: crypto.randomUUID(),
    text: note,
    createdAt: new Date().toISOString(),
    tags: [],
  });

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(noteRecord);

    request.onsuccess = () => resolve(noteRecord);
    request.onerror = () => reject(request.error ?? new Error('Failed to save note.'));
    transaction.oncomplete = () => db.close();
    transaction.onerror = () => reject(transaction.error ?? new Error('Failed to save note.'));
  });
};

export const getAllNotesFromIndexedDB = async (): Promise<NoteRecord[]> => {
  const db = await openNotesDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () =>
      resolve((request.result as Array<Omit<NoteRecord, 'tags'> & { tags?: unknown }>).map(normalizeStoredNote));
    request.onerror = () => reject(request.error ?? new Error('Failed to retrieve notes.'));
    transaction.oncomplete = () => db.close();
    transaction.onerror = () => reject(transaction.error ?? new Error('Failed to retrieve notes.'));
  });
};

export const importNotesToIndexedDB = async (payload: unknown): Promise<NoteRecord[]> => {
  const db = await openNotesDatabase();
  const notesToImport = normalizeImportedNotes(payload);

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    notesToImport.forEach(noteRecord => {
      store.put(noteRecord);
    });

    transaction.oncomplete = () => {
      db.close();
      resolve(notesToImport);
    };
    transaction.onerror = () => reject(transaction.error ?? new Error('Failed to import notes.'));
    transaction.onabort = () => reject(transaction.error ?? new Error('Failed to import notes.'));
  });
};

export const deleteNoteFromIndexedDB = async (noteId: string): Promise<NoteRecord> => {
  const db = await openNotesDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const getRequest = store.get(noteId);

    getRequest.onsuccess = () => {
      const existingNote = getRequest.result ? normalizeStoredNote(getRequest.result as NoteRecord) : undefined;

      if (!existingNote) {
        reject(new Error(`Note with ID "${noteId}" was not found.`));
        return;
      }

      const deleteRequest = store.delete(noteId);
      deleteRequest.onsuccess = () => resolve(existingNote);
      deleteRequest.onerror = () => reject(deleteRequest.error ?? new Error('Failed to delete note.'));
    };

    getRequest.onerror = () => reject(getRequest.error ?? new Error('Failed to find note to delete.'));
    transaction.oncomplete = () => db.close();
    transaction.onerror = () => reject(transaction.error ?? new Error('Failed to delete note.'));
  });
};

export const editNoteInIndexedDB = async (noteId: string, newText: string): Promise<NoteRecord> => {
  const db = await openNotesDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const getRequest = store.get(noteId);

    getRequest.onsuccess = () => {
      const existingNote = getRequest.result ? normalizeStoredNote(getRequest.result as NoteRecord) : undefined;

      if (!existingNote) {
        reject(new Error(`Note with ID "${noteId}" was not found.`));
        return;
      }

      const updatedNote: NoteRecord = { ...existingNote, text: newText };
      const updateRequest = store.put(updatedNote);

      updateRequest.onsuccess = () => resolve(updatedNote);
      updateRequest.onerror = () => reject(updateRequest.error ?? new Error('Failed to edit note.'));
    };

    getRequest.onerror = () => reject(getRequest.error ?? new Error('Failed to find note to edit.'));
    transaction.oncomplete = () => db.close();
    transaction.onerror = () => reject(transaction.error ?? new Error('Failed to edit note.'));
  });
};

export const tagNoteInIndexedDB = async (noteId: string, tags: string[]): Promise<NoteRecord> => {
  const db = await openNotesDatabase();
  const normalizedTags = normalizeNoteTags(tags);

  if (normalizedTags.length === 0) {
    throw new Error('At least one valid tag is required.');
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const getRequest = store.get(noteId);

    getRequest.onsuccess = () => {
      const existingNote = getRequest.result ? normalizeStoredNote(getRequest.result as NoteRecord) : undefined;

      if (!existingNote) {
        reject(new Error(`Note with ID "${noteId}" was not found.`));
        return;
      }

      const updatedNote: NoteRecord = {
        ...existingNote,
        tags: [...new Set([...existingNote.tags, ...normalizedTags])],
      };
      const updateRequest = store.put(updatedNote);

      updateRequest.onsuccess = () => resolve(updatedNote);
      updateRequest.onerror = () => reject(updateRequest.error ?? new Error('Failed to tag note.'));
    };

    getRequest.onerror = () => reject(getRequest.error ?? new Error('Failed to find note to tag.'));
    transaction.oncomplete = () => db.close();
    transaction.onerror = () => reject(transaction.error ?? new Error('Failed to tag note.'));
  });
};
