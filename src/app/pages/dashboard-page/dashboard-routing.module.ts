import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardResolver } from 'src/app/shared/resolvers/dashboard.resolver';

const routes: Routes = [
  {
    path: 'main',
    resolve: { dashboardResolver },
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
