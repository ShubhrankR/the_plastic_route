import { Injectable, signal } from '@angular/core';
import { CreditCard } from '../models/card.model';

const DB_NAME = 'ThePlasticRouteDB';
const DB_VERSION = 1;
const CARDS_STORE = 'user_cards';
const SETTINGS_STORE = 'user_settings';

@Injectable({ providedIn: 'root' })
export class IndexedDBService {
  private db: IDBDatabase | null = null;
  readonly isInitialized = signal<boolean>(false);

  constructor() {
    this.initDB().catch(err => {
      console.warn('IndexedDB failed to initialize, falling back to in-memory/JSON store:', err);
    });
  }

  /** Initialize IndexedDB database connection and create stores if needed. */
  async initDB(): Promise<IDBDatabase> {
    if (this.db) {
      return this.db;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(CARDS_STORE)) {
          db.createObjectStore(CARDS_STORE, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(SETTINGS_STORE)) {
          db.createObjectStore(SETTINGS_STORE, { keyPath: 'key' });
        }
      };

      request.onsuccess = (event: Event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        this.isInitialized.set(true);
        resolve(this.db);
      };

      request.onerror = (event: Event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  /** Retrieve all custom cards from IndexedDB. */
  async getAllCards(): Promise<CreditCard[]> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(CARDS_STORE, 'readonly');
      const store = tx.objectStore(CARDS_STORE);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result as CreditCard[]);
      request.onerror = () => reject(request.error);
    });
  }

  /** Save or update a credit card entry in IndexedDB. */
  async saveCard(card: CreditCard): Promise<void> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(CARDS_STORE, 'readwrite');
      const store = tx.objectStore(CARDS_STORE);
      const request = store.put(card);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /** Delete a card from IndexedDB by ID. */
  async deleteCard(id: string): Promise<void> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(CARDS_STORE, 'readwrite');
      const store = tx.objectStore(CARDS_STORE);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /** Populate IndexedDB with default cards if empty. */
  async seedDefaultCards(cards: CreditCard[]): Promise<void> {
    const existing = await this.getAllCards();
    if (existing.length === 0) {
      for (const card of cards) {
        await this.saveCard(card);
      }
    }
  }
}
