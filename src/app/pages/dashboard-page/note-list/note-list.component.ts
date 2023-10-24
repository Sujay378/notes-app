import { Component } from '@angular/core';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
})
export class NoteListComponent {
  pageIconLines: number[] = Array.from({ length: 38 });
  documentList: number[] = Array.from({ length: 0 });
}
