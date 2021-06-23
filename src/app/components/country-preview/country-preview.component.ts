import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Country } from 'src/app/services/country-service/country';
import { FavoriteCountriesService } from 'src/app/services/favorite-countries-service/favorite-countries.service';

@Component({
  selector: 'app-country-preview',
  templateUrl: './country-preview.component.html',
  styleUrls: ['./country-preview.component.scss']
})
export class CountryPreviewComponent implements OnInit {

  @Input() country!: Country
  @Input() areActionsEnabled: boolean = true
  @Output() deleteCountry: EventEmitter<string | number> = new EventEmitter()


  constructor(
    private favoriteCountriesService: FavoriteCountriesService
  ) { }

  ngOnInit(): void {
  }

  onDeleteCountry = (): void => {
    this.deleteCountry.emit(this.country.numericCode)
  }

  onSaveCountry = (): void => {
    this.favoriteCountriesService.saveFavoriteCountry(this.country)
  }

}
