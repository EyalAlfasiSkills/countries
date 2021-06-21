import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})
export class CountriesListComponent implements OnInit {

  @Input() countries = null
  @Input() onDeleteCountry!: Function;

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(numericCode: string): void {
    console.log(numericCode);

  }

}
