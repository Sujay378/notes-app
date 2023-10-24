import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNoteComponent } from './create-note/create-note.component';
import { createNoteResolver } from 'src/app/shared/resolvers/create-note.resolver';

const routes: Routes = [
  {
    path: 'create',
    resolve: { title: createNoteResolver },
    component: CreateNoteComponent,
  },
  { path: 'edit/:title', component: CreateNoteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoteRoutingModule {}
