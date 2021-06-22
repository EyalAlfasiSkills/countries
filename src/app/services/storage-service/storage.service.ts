import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService<T> {

  constructor() { }

  save(key: string, entity: T) {
    localStorage.setItem(key, JSON.stringify(entity))
    return entity
  }

  load(key: string): T {
    const entity: string | null = localStorage.getItem(key)
    return entity ? JSON.parse(entity) : null
  }

  remove(key: string) {
    localStorage.removeItem(key)
  }
}
