import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth-page/auth.module').then(module => module.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard-page/dashboard.module').then(module => module.DashboardModule)
  },
  {
    path: 'note',
    loadChildren: () => import('./pages/note-page/note.module').then(module => module.NoteModule)
  },
  { path: 'pagenotfound', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'pagenotfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
