import { createReducer, on } from '@ngrx/store';
import { NotesState } from 'src/app/shared/models/store.model';
import * as noteActions from './notes.action';
import { Note } from 'src/app/shared/models/generic.model';

const initialState: NotesState = {
  userNotesLoaded: false,
  userNotes: [],
  guestNotes: [],
  selectedNote: null,
};

export const notesReducer = createReducer(
  initialState,
  on(noteActions.addGuestNote, (state, action) => {
    const newNote: Note = {
      ...action.payload,
      noteId: state.guestNotes.length + '',
    };
    return { ...state, guestNotes: [...state.guestNotes, newNote] };
  }),
  on(noteActions.updateBackendUserNotes, (state, action) => {
    return { ...state, userNotes: [...state.userNotes, ...action.payload] };
  }),
  on(noteActions.sendUserNoteToBackend, (state, action) => state),
  on(noteActions.mergeUserNote, (state, action) => {
    return {
      ...state,
      userNotes: [...state.userNotes, action.payload],
    };
  }),
  on(noteActions.removeGuestNote, (state, action) => {
    return {
      ...state,
      guestNotes: state.guestNotes.filter(
        (note) => action.payload.noteId === note.noteId
      ),
    };
  }),
  on(noteActions.initiateRemovingUserNote, (state, action) => state),
  on(noteActions.finishRemovingUserNote, (state, action) => {
    return {
      ...state,
      userNotes: state.userNotes.filter(
        (note) => action.payload.noteId !== note.noteId
      ),
    };
  }),
  on(noteActions.updateUserNote, (state, action) => {
    return {
      ...state,
      userNotes: [
        ...state.userNotes.filter(
          (note) => note.noteId !== action.payload.noteId
        ),
        action.payload,
      ],
    };
  }),
  on(noteActions.updateGuestNote, (state, action) => {
    return {
      ...state,
      guestNotes: [
        ...state.guestNotes.filter(
          (note) => note.noteId !== action.payload.noteId
        ),
        action.payload,
      ],
    };
  }),
  on(noteActions.clearGuestNotes, (state, action) => {
    return { ...state, guestNotes: [] };
  }),
  on(noteActions.mergeGuestNotes, (state, action) => {
    return { ...state, userNotes: [...state.userNotes, ...state.guestNotes] };
  }),
  on(noteActions.setSelectedNote, (state, action) => {
    const { index, guest } = action.payload;
    const selectedNote = guest
      ? state.guestNotes[index]
      : state.userNotes[index];
    return { ...state, selectedNote };
  })
);
