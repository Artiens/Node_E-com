import { Injectable } from '@angular/core';
import { Product } from '../models/products.models';

export interface CartItem {
  product: Product;
  size: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private dbName = 'cartDB';
  private storeName = 'cart';
  private db: IDBDatabase | null = null;
  private dbReady: Promise<void>;

  constructor() {
    // Initialize the promise that ensures DB is ready
    this.dbReady = this.openDatabase(); // Wait until the database is ready
  }

  // Open or create the IndexedDB database
  private openDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;

        if (!db.objectStoreNames.contains(this.storeName)) {
          // Create the object store with auto-increment keys
          const store = db.createObjectStore(this.storeName, { autoIncrement: true });
        }
      };

      request.onsuccess = (event: any) => {
        this.db = event.target.result;
        resolve(); // Resolve the promise when the database is ready
      };

      request.onerror = (event: any) => {
        console.error('Error opening IndexedDB:', event);
        reject('Error opening IndexedDB');
      };
    });
  }

  // Wait until the database is ready to perform actions
  private ensureDbReady(): Promise<void> {
    return this.dbReady; // This will wait until the database is ready
  }

  // Add a product to the cart
  async addToCart(product: Product, size: number): Promise<void> {
    await this.ensureDbReady(); // Wait until the database is ready

    const transaction = this.db!.transaction(this.storeName, 'readwrite');
    const store = transaction.objectStore(this.storeName);

    // Create cart item without the id, it will be auto-generated
    const cartItem: CartItem = { product, size };

    return new Promise<void>((resolve, reject) => {
      const request = store.add(cartItem); // No need to provide a key, it will auto-increment

      request.onsuccess = () => {
        console.log('Product added to cart:', product);
        resolve();
      };

      request.onerror = (event: any) => {
        console.error('Error adding product to cart:', event);
        reject('Failed to add product to cart');
      };
    });
  }

  // Retrieve all cart items from IndexedDB
  async getCartItems(): Promise<CartItem[]> {
    await this.ensureDbReady(); // Wait until the database is ready

    return new Promise<CartItem[]>((resolve, reject) => {
      const transaction = this.db!.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = (event: any) => {
        resolve(event.target.result);
      };

      request.onerror = (event: any) => {
        reject('Error retrieving cart items');
      };
    });
  }

  // Clear the cart in IndexedDB
  async clearCart(): Promise<void> {
    await this.ensureDbReady(); // Wait until the database is ready

    return new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      store.clear();

      transaction.oncomplete = () => {
        console.log('Cart cleared');
        resolve();
      };

      transaction.onerror = (event: any) => {
        console.error('Error clearing the cart:', event);
        reject('Error clearing the cart');
      };
    });
  }
}
