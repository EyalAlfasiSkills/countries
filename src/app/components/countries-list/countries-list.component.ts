import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Country } from 'src/app/services/country-service/country';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})
export class CountriesListComponent implements OnInit {

  @Input() countries: Country[] = []
  @Output() deleteCountry: EventEmitter<string | number> = new EventEmitter()
  @Input() areActionsEnabled: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteCountry = (event: string | number): void => {
    this.deleteCountry.emit(event)
  }
}
