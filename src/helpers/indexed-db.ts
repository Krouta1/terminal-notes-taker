const DB_NAME = 'terminal-notes-taker';
const STORE_NAME = 'notes';

export type NoteRecord = {
  id: string;
  text: string;
  createdAt: string;
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
  const noteRecord: NoteRecord = {
    id: crypto.randomUUID(),
    text: note,
    createdAt: new Date().toISOString(),
  };

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

    request.onsuccess = () => resolve(request.result as NoteRecord[]);
    request.onerror = () => reject(request.error ?? new Error('Failed to retrieve notes.'));
    transaction.oncomplete = () => db.close();
    transaction.onerror = () => reject(transaction.error ?? new Error('Failed to retrieve notes.'));
  });
};
