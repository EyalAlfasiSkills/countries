import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteCountriesComponent } from './favorite-countries.component';

describe('FavoriteCountriesComponent', () => {
  let component: FavoriteCountriesComponent;
  let fixture: ComponentFixture<FavoriteCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteCountriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
