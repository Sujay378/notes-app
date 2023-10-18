import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  initiateAddingUserNote,
  finishAddingUserNote,
  clearGuestNotes,
  mergeGuestNotes,
  initiateRemovingUserNote,
  finishRemovingUserNote,
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
import { setAppProcessing, showAlert } from '../global/global.action';

@Injectable({
  providedIn: 'root',
})
export class NotesEffect {
  addUserNoteToDB = createEffect(() =>
    this.actions$.pipe(
      ofType(initiateAddingUserNote),
      tap(() => this.store.dispatch(setAppProcessing({ payload: true }))),
      exhaustMap((action) => {
        const payload = { ...action.payload };
        return this.http.httpPost('note', 'add', payload).pipe(
          switchMap((data: any) => {
            //show alert
            return of(
              finishAddingUserNote({
                payload: {
                  noteId: data.noteId,
                  title: data.title,
                  description: data.description,
                },
              }),
              showAlert({
                payload: {
                  type: 'success',
                  message: 'Note added successfully',
                },
              })
            );
          }),
          catchError((err) => {
            //show alert
            this.store.dispatch(setAppProcessing({ payload: false }));
            return of(
              showAlert({
                payload: {
                  type: 'error',
                  message: 'Oops! something went wrong',
                },
              })
            );
          })
        );
      })
    )
  );

  deleteUserNoteFromDB = createEffect(() =>
    this.actions$.pipe(
      ofType(initiateRemovingUserNote),
      tap(() => this.store.dispatch(setAppProcessing({ payload: true }))),
      exhaustMap((action) => {
        const payload = { ...action.payload };
        return this.http.httpPost('note', 'remove', payload).pipe(
          switchMap((data: any) => {
            //show alert
            return of(
              finishRemovingUserNote({ payload: { ...data } }),
              showAlert({
                payload: {
                  type: 'success',
                  message: 'Note removed successfully',
                },
              })
            );
          }),
          catchError((err) => {
            //show alert
            this.store.dispatch(setAppProcessing({ payload: false }));
            return of(
              showAlert({
                payload: {
                  type: 'Error',
                  message: 'Oops! something went wrong',
                },
              })
            );
          })
        );
      })
    )
  );

  updateUserNoteFromDB = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserNote),
      tap(() => this.store.dispatch(setAppProcessing({ payload: true }))),
      withLatestFrom(this.store.select(userDetails)),
      exhaustMap(([action, user]) => {
        const payload = { userId: user.userId, ...action.payload };
        return this.http.httpPost('note', 'remove', payload).pipe(
          map((data) => {
            //show alert
            this.store.dispatch(setAppProcessing({ payload: false }));
            return showAlert({
              payload: {
                type: 'success',
                message: 'Note updated successfully',
              },
            });
          }),
          catchError((err) => {
            //show alert
            this.store.dispatch(setAppProcessing({ payload: false }));
            return of(
              showAlert({
                payload: {
                  type: 'error',
                  message: 'Oops! something went wrong',
                },
              })
            );
          })
        );
      })
    )
  );

  mergeGuestNotesToDB = createEffect(() =>
    this.actions$.pipe(
      ofType(mergeGuestNotes),
      tap(() => this.store.dispatch(setAppProcessing({ payload: true }))),
      withLatestFrom(
        this.store.select(userDetails),
        this.store.select(getGuestNotes)
      ),
      exhaustMap(([action, user, guestNotes]) => {
        const payload = {
          userId: user.userId,
          notes: guestNotes.map((note) => {
            return { title: note.title, description: note.description };
          }),
        };
        return this.http.httpPost('note', 'merge', payload).pipe(
          switchMap((data) => {
            //show alert
            return of(
              showAlert({
                payload: {
                  type: 'success',
                  message: 'Temporary notes saved successfully',
                },
              }),
              clearGuestNotes()
            );
          }),
          catchError((err) => {
            this.store.dispatch(setAppProcessing({ payload: false }));
            return of(
              showAlert({
                payload: {
                  type: 'error',
                  message: 'Oops! something went wrong',
                },
              })
            );
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
