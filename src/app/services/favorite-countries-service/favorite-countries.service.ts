import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Country } from '../country-service/country';
import { StorageService } from '../storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteCountriesService {

  private STORAGE_KEY = 'FAVORITE_COUNTRIES_DB';

  constructor(
    private storage: StorageService<Country[]>
  ) {
  }

  private countriesSubject: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>(this.getFavoriteCountries())
  public countries$: Observable<Country[]> = this.countriesSubject.asObservable()

  getFavoriteCountries(): Country[] {
    const savedCountries = this.storage.load(this.STORAGE_KEY)
    return savedCountries ? savedCountries : []
  }

  saveFavoriteCountry(country: Country): void {
    let isAlreadySaved;
    let allFavoriteCountries: Country[] = this.getFavoriteCountries()
    if (allFavoriteCountries) {
      isAlreadySaved = allFavoriteCountries.find((savedCountry: Country) => savedCountry.numericCode === country.numericCode)
    }
    if (isAlreadySaved) return

    if (!allFavoriteCountries) {
      allFavoriteCountries = [country]
    } else if (allFavoriteCountries.length === 5) {
      allFavoriteCountries.unshift(country)
      allFavoriteCountries.pop()
    } else {
      allFavoriteCountries.unshift(country)
    }
    this.storage.save(this.STORAGE_KEY, allFavoriteCountries)
    this.countriesSubject.next(allFavoriteCountries)
  }

}
