import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesPageComponent } from './pages/countries-page/countries-page.component';
import { FavoriteCountriesComponent } from './pages/favorite-countries-page/favorite-countries/favorite-countries.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard-service/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'favorites', component: FavoriteCountriesComponent, canActivate: [AuthGuard] },
  { path: 'countries', component: CountriesPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
