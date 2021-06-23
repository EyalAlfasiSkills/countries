import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private storage: StorageService<string>,
  ) {
  }

  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(Boolean(this.getLoggedInUser()))

  private STORAGE_KEY = 'LOGGED_IN_USER';

  logIn(email: string) {
    this.storage.save(this.STORAGE_KEY, email)
    this.setIsAuthenticated(true)
  }

  logOut() {
    this.storage.remove(this.STORAGE_KEY)
    this.setIsAuthenticated(false)
  }


  setIsAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticated$.next(isAuthenticated)
  }

  getLoggedInUser() {
    return this.storage.load(this.STORAGE_KEY)
  }

}
