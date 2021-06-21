import { Component, OnInit } from '@angular/core';
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

  countries: any

  ngOnInit(): void {
    this.countryService.query()
    this.countryService.countries?.subscribe(countries => {
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
    this.countries = this.countryService.loadCountries()
  }
}
