import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteRoutingModule } from './note-routing.module';
import { CreateNoteComponent } from './create-note/create-note.component';


@NgModule({
  declarations: [
    CreateNoteComponent
  ],
  imports: [
    CommonModule,
    NoteRoutingModule
  ]
})
export class NoteModule { }
