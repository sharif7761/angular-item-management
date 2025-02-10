import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private storageKey = 'items';

  getItems(): Item[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveItems(items: Item[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  addItem(item: Item): void {
    const items = this.getItems();
    items.push(item);
    this.saveItems(items);
  }

  updateItem(updatedItem: Item): void {
    const items = this.getItems().map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    this.saveItems(items);
  }

  deleteItem(id: number): void {
    const items = this.getItems().filter(item => item.id !== id);
    this.saveItems(items);
  }
}
