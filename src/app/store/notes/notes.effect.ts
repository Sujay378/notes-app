import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addUserNote,
  clearGuestNotes,
  mergeGuestNotes,
  removeUserNote,
  updateUserNote,
} from './notes.action';
import {
  catchError,
  exhaustMap,
  map,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { AppState } from 'src/app/shared/models/store.model';
import { Store } from '@ngrx/store';
import { userDetails } from '../user/user.selector';
import { Injectable } from '@angular/core';
import { getGuestNotes } from './notes.selector';
import { showAlert } from '../global/global.action';

@Injectable({
  providedIn: 'root',
})
export class NotesEffect {
  addUserNoteToDB = createEffect(() =>
    this.actions$.pipe(
      ofType(addUserNote),
      withLatestFrom(this.store.select(userDetails)),
      exhaustMap(([action, user]) => {
        const payload = { ...action.payload, userId: user.userId };
        return this.http.httpPost('note', 'add', payload).pipe(
          map((data) => {
            //show alert
            return showAlert({
              payload: { type: 'success', message: 'Note added successfully' },
            });
          }),
          catchError((err) => {
            //show alert
            return of(
              showAlert({
                payload: {
                  type: 'error',
                  message: 'Something went wrong',
                },
              })
            );
          })
        );
      })
    )
  );

  deleteUserNoteFromDB = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeUserNote),
        withLatestFrom(this.store.select(userDetails)),
        exhaustMap(([action, user]) => {
          const payload = { userId: user.userId, ...action.payload };
          return this.http.httpPost('note', 'remove', payload).pipe(
            map((data) => {
              //show alert
              return data;
            }),
            catchError((err) => {
              //show alert
              return of({
                type: err.type,
                message: err.message,
              });
            })
          );
        })
      ),
    { dispatch: false }
  );

  updateUserNoteFromDB = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateUserNote),
        withLatestFrom(this.store.select(userDetails)),
        exhaustMap(([action, user]) => {
          const payload = { userId: user.userId, ...action.payload };
          return this.http.httpPost('note', 'remove', payload).pipe(
            map((data) => {
              //show alert
              return data;
            }),
            catchError((err) => {
              //show alert
              return of({
                type: err.type,
                message: err.message,
              });
            })
          );
        })
      ),
    { dispatch: false }
  );

  updateGuestNotesToDB = createEffect(() =>
    this.actions$.pipe(
      ofType(mergeGuestNotes),
      withLatestFrom(
        this.store.select(userDetails),
        this.store.select(getGuestNotes)
      ),
      switchMap(([action, user, guestNotes]) => {
        const payload = {
          userId: user.userId,
          notes: guestNotes.map((note) => {
            return { title: note.title, description: note.description };
          }),
        };
        return this.http.httpPost('note', 'merge', payload).pipe(
          map((data) => {
            //show alert
            return clearGuestNotes();
          }),
          catchError((err) => {
            return of({
              type: err.type,
              message: err.message,
            });
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private http: HttpService
  ) {}
}
