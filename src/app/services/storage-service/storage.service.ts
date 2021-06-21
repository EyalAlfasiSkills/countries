import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  save(key: string, entity: any) {
    localStorage.setItem(key, JSON.stringify(entity))
    return entity
  }

  load(key: string) {
    const entity: string | null = localStorage.getItem(key)
    return entity ? JSON.parse(entity) : null
  }
}
