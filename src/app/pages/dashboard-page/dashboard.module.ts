import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/components/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    NoteListComponent,
    NoteViewComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
