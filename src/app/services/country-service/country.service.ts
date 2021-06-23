import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../storage-service/storage.service';
import { Country } from './country';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private BASE_URL = 'https://restcountries.eu/rest/v2/all';
  private COUNTRIES_KEY = 'COUNTRIES_DB';
  private FAVORITE_COUNTRIES_KEY = 'FAVORITE_COUNTRIES_DB';

  constructor(
    private http: HttpClient,
    private storage: StorageService<Country[]>
  ) {
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.BASE_URL).pipe(
      tap((x) => this.saveCountries(x)),
      take(1)
    )
  }

  saveCountries(countries: Country[]) {
    this.storage.save(this.COUNTRIES_KEY, countries)
  }

  reloadCountries() {
    return this.storage.load(this.COUNTRIES_KEY)
  }
}
