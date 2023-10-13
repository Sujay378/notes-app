import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/shared/models/store.model';

const getNoteState = (state: AppState) => state.note;

export const getUserNotes = createSelector(
  getNoteState,
  (state) => state.userNotes
);

export const getSingleUserNote = (id: string) =>
  createSelector(getUserNotes, (notes) =>
    notes.find((note) => note.noteId === id)
  );

export const getGuestNotes = createSelector(
  getNoteState,
  (state) => state.guestNotes
);
