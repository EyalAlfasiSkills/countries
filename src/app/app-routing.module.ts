import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesPageComponent } from './pages/countries-page/countries-page.component';

const routes: Routes = [
  { path: '', component: CountriesPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
