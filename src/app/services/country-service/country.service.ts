import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { StorageService } from '../storage-service/storage.service';
import { Country } from './country';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private BASE_URL = 'https://restcountries.eu/rest/v2/all';
  private STORAGE_KEY = 'COUNTRIES_DB';

  constructor(
    private http: HttpClient,
    private storage: StorageService<Country[]>
  ) {
  }

  private countriesSubject: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([])
  public countries$: Observable<Country[]> = this.countriesSubject.asObservable()

  loadCountries(): void {
    const savedCountries: Country[] = this.getCountriesFromStorage()
    if (savedCountries) {
      this.countriesSubject.next(savedCountries)
    }
    else {
      this.fetchCountries()
    }
  }

  fetchCountries() {
    this.http.get<Country[]>(this.BASE_URL).pipe(
      map(countries => {
        const newCountries = countries.map(country => {
          const [lat, lng] = country.latlng
          return {
            ...country,
            latlng: {
              lat,
              lng
            }
          }
        })
        return newCountries
      }),
      tap((fetchedCountries) => {
        this.saveCountries(fetchedCountries)
        this.countriesSubject.next(fetchedCountries)
      }),
    ).subscribe(res => console.log('Fetched successfully'))
  }

  saveCountries(countries: Country[]) {
    this.storage.save(this.STORAGE_KEY, countries)
  }

  deleteCountry(numericCode: string | number) {
    const countriesToSave = this.getCountriesFromStorage().filter(savedCountry => {
      return savedCountry.numericCode !== numericCode
    })
    const savedCountries = this.storage.save(this.STORAGE_KEY, countriesToSave)
    this.countriesSubject.next(savedCountries)
  }

  getCountriesFromStorage() {
    return this.storage.load(this.STORAGE_KEY)
  }
}
