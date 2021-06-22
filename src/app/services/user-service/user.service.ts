import { Injectable } from '@angular/core';
import { StorageService } from '../storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private storage: StorageService<string>
  ) {
  }

  private STORAGE_KEY = 'LOGGED_IN_USER';

  logIn(email: string) {
    this.storage.save(this.STORAGE_KEY, email)
  }

  logOut() {
    this.storage.remove(this.STORAGE_KEY)
  }

  getLoggedInUser() {
    return this.storage.load(this.STORAGE_KEY)
  }

}
