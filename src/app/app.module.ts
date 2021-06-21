import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { CountryPreviewComponent } from './components/country-preview/country-preview.component';
import { CountriesPageComponent } from './pages/countries-page/countries-page.component';
import { FormsModule } from '@angular/forms';
import { CountryNameFilterPipe } from './pipes/country-name-filter/country-name-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CountriesListComponent,
    CountryPreviewComponent,
    CountriesPageComponent,
    CountryNameFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
