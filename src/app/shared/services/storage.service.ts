import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    try {
      const item: any = localStorage.getItem(key);
      return JSON.parse(item);
    } catch (e) {
      return null;
    }
  }

  remove(key: string): any {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
