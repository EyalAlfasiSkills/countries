import { Component, Input, OnInit } from '@angular/core';
import { Country } from 'src/app/services/country-service/country';

@Component({
  selector: 'app-country-preview',
  templateUrl: './country-preview.component.html',
  styleUrls: ['./country-preview.component.scss']
})
export class CountryPreviewComponent implements OnInit {

  @Input() country!: Country
  @Input() onDeleteCountry!: Function

  constructor() { }

  ngOnInit(): void {
  }

}
