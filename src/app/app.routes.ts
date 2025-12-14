import { Routes } from '@angular/router';
import { WeatherComponent } from './components/weather/weather';
import { Settings } from './components/settings/settings';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: WeatherComponent },
  { path: 'settings', component: Settings }
];
