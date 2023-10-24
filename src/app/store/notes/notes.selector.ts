import { createSelector } from '@ngrx/store';
import { Note } from 'src/app/shared/models/generic.model';
import { AppState } from 'src/app/shared/models/store.model';

const getNoteState = (state: AppState) => state.note;

export const getUserNotes = createSelector(
  getNoteState,
  (state) => state.userNotes
);

export const areUserNotesLoaded = createSelector(
  getNoteState,
  (state) => state.userNotesLoaded
);

export const getSingleUserNote = (title: string) =>
  createSelector(getUserNotes, (notes) =>
    notes.find((note) => note.noteTitle === title)
  );

export const getGuestNotes = createSelector(
  getNoteState,
  (state) => state.guestNotes
);

export const getAllGuestNoteTitles = createSelector(
  getGuestNotes,
  (guestNotes) =>
    guestNotes.reduce((acc, note) => {
      return [...acc, note.noteTitle];
    }, <string[]>[])
);

export const getSingleGuestNote = (title: string) =>
  createSelector(getGuestNotes, (guestNotes) =>
    guestNotes.find((note) => note.noteTitle === title)
  );

export const getSelectedNote = createSelector(
  getNoteState,
  (state) => state.selectedNote
);
