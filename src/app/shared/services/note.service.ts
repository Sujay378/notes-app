import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from '../models/generic.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  public selectNote = new Subject<Note | null>();

  constructor() {}
}
