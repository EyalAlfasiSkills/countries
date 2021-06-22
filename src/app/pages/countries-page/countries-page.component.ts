import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Country } from 'src/app/services/country-service/country';
import { CountryService } from 'src/app/services/country-service/country.service';

@Component({
  selector: 'app-countries-page',
  templateUrl: './countries-page.component.html',
  styleUrls: ['./countries-page.component.scss']
})
export class CountriesPageComponent implements OnInit {

  constructor(private countryService: CountryService) {
  }

  countries: Country[] = []
  searchWord: string = ''

  ngOnInit(): void {
    this.initializeCountries()
  }

  get countriesForDisplay(): Country[] {
    const filteredCountries: Country[] = this.countries.filter((country: Country) => {
      return country.name.toLowerCase().includes(this.searchWord.toLowerCase())
    })
    return filteredCountries
  }

  initializeCountries(): void {
    this.countryService.getCountries()
      .subscribe(countries => {
        this.countries = countries;
        this.countryService.saveCountries(countries)
      }, (err) => {
        console.log('Couldn\'t fetch countries' + err);
      })
  }

  onDeleteCountry = (numericCode: number | string): void => {
    this.countries = this.countries.filter((country: Country) => {
      return country.numericCode !== numericCode
    })
  }

  onReloadCountries = () => {
    this.countries = this.countryService.reloadCountries()
  }
}
