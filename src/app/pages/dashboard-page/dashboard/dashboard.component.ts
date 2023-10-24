import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/shared/models/generic.model';
import { AppState } from 'src/app/shared/models/store.model';
import { NoteService } from 'src/app/shared/services/note.service';
import {
  getGuestNotes,
  getUserNotes,
  isUserLogged,
  setAppProcessing,
  showAlert,
} from 'src/app/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  subScriptions$: Subscription[] = [];
  userNotes: Note[] = [];
  userLogged: boolean = false;

  constructor(
    private store: Store<AppState>,
    private _router: Router,
    private _noteService: NoteService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(setAppProcessing({ payload: false }));

    this.store
      .select(isUserLogged)
      .subscribe((userLogged) => (this.userLogged = userLogged))
      .unsubscribe();

    if (this.userLogged) {
      this.store
        .select(getGuestNotes)
        .subscribe((notes) => [...this.userNotes, ...notes])
        .unsubscribe();
    } else {
      this.store
        .select(getGuestNotes)
        .subscribe((notes) => [...this.userNotes, notes])
        .unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this._noteService.selectNote.next(this.userNotes[0]);
  }

  openModal() {
    this._router.navigate(['auth/standby'], {
      skipLocationChange: true,
      queryParamsHandling: 'preserve',
    });

    setTimeout(() => {
      window.close();
    }, 3000);
  }

  ngOnDestroy(): void {
    this.subScriptions$.forEach((subscription) => subscription.unsubscribe());
  }
}
