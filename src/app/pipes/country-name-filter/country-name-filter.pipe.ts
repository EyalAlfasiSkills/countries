import { Pipe, PipeTransform } from '@angular/core';
import { Country } from 'src/app/services/country-service/country';

@Pipe({
  name: 'countryNameFilter'
})
export class CountryNameFilterPipe implements PipeTransform {

  transform(countries: Country[], searchWord: string): Country[] {
    return countries.filter(country => {
      return country.name.toLowerCase().includes(searchWord.toLowerCase())
    });
  }
}
