import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/services/country-service/country';
import { FavoriteCountriesService } from 'src/app/services/favorite-countries-service/favorite-countries.service';

@Component({
  selector: 'app-favorite-countries',
  templateUrl: './favorite-countries.component.html',
  styleUrls: ['./favorite-countries.component.scss']
})
export class FavoriteCountriesComponent implements OnInit {

  constructor(
    private favoriteCountriesService: FavoriteCountriesService
  ) { }

  countries: Country[] = []

  ngOnInit(): void {
    // const countries = this.favoriteCountriesService.getFavoriteCountries()
    // if (countries) {
    //   this.countries = countries
    // }
    this.favoriteCountriesService.countries$.subscribe(countries => {
      if (countries.length) {
        this.countries = countries
      }
    })
  }
}
