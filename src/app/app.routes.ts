import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'cards', pathMatch: 'full' },
  {
    path: 'cards',
    loadComponent: () => import('./cards/cards').then((m) => m.Cards),
  },
];
