import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Country } from 'src/app/services/country-service/country';

@Component({
  selector: 'app-country-preview',
  templateUrl: './country-preview.component.html',
  styleUrls: ['./country-preview.component.scss']
})
export class CountryPreviewComponent implements OnInit {

  @Input() country!: Country
  @Output() deleteCountry: EventEmitter<string | number> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteCountry = (): void => {
    this.deleteCountry.emit(this.country.numericCode)
  }

}
