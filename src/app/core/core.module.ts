import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/components/shared.module';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('../pages/auth-page/auth.module').then(
        (module) => module.AuthModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../pages/dashboard-page/dashboard.module').then(
        (module) => module.DashboardModule
      ),
  },
  {
    path: 'note',
    loadChildren: () =>
      import('../pages/note-page/note.module').then(
        (module) => module.NoteModule
      ),
  },
];

@NgModule({
  declarations: [CoreComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class CoreModule {}
