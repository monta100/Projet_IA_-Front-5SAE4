import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { GestionRepasComponent } from './Pages/gestion-repas/gestion-repas.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'gestion-repas', component: GestionRepasComponent },
  { path: '**', redirectTo: 'home' }
];
