import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/store.model';
import { HttpService } from '../services/http.service';
import { Observable, exhaustMap, of, withLatestFrom } from 'rxjs';
import {
  areUserNotesLoaded,
  isUserLogged,
  updateBackendUserNotes,
} from 'src/app/store';
import { Note } from '../models/generic.model';

export const dashboardResolver: ResolveFn<Observable<boolean>> = (
  route,
  state
) => {
  const store = inject(Store<AppState>);
  const http = inject(HttpService);

  return new Observable<boolean>((observer) => {
    store
      .pipe(
        withLatestFrom([
          store.select(isUserLogged),
          store.select(areUserNotesLoaded),
        ]),
        exhaustMap(([userLogged, notesLoaded]) => {
          console.log();
          if (userLogged && !notesLoaded)
            return <Observable<Note[]>>http.httpGet('note', 'fetchUserNotes');
          return of(null);
        })
      )
      .subscribe((data: Note[] | null) => {
        if (data) store.dispatch(updateBackendUserNotes({ payload: data }));
        console.log('resolver worked');
        observer.next(true);
      });
  });
};
