import { createReducer, on } from '@ngrx/store';
import { NotesState } from 'src/app/shared/models/store.model';
import {
  addGuestNote,
  removeUserNote,
  addUserNote,
  mergeGuestNotes,
  removeGuestNote,
  clearGuestNotes,
  updateUserNote,
  updateGuestNote,
} from './notes.action';
import { Note } from 'src/app/shared/models/generic.model';

const initialState: NotesState = {
  userNotes: [],
  guestNotes: [],
};

export const notesReducer = createReducer(
  initialState,
  on(addGuestNote, (state, action) => {
    const newNote: Note = {
      ...action.payload,
      noteId: state.guestNotes.length + ''
    };
    return { ...state, guestNotes: [...state.guestNotes, newNote] };
  }),
  on(addUserNote, (state, action) => {
    const newNote: Note = {
      ...action.payload,
      noteId: state.guestNotes.length + ''
    };
    return { ...state, userNotes: [...state.userNotes, newNote] };
  }),
  on(removeGuestNote, (state, action) => {
    return {
      ...state,
      guestNotes: state.guestNotes.filter(
        (note) => action.payload.noteId === note.noteId
      ),
    };
  }),
  on(removeUserNote, (state, action) => {
    return {
      ...state,
      userNotes: state.userNotes.filter(
        (note) => action.payload.noteId === note.noteId
      ),
    };
  }),
  on(updateUserNote, (state, action) => {
    return {
      ...state,
      userNotes: [...state.userNotes.filter(note => note.noteId !== action.payload.noteId), action.payload]
    }
  }),
  on(updateGuestNote, (state, action) => {
    return {
      ...state,
      guestNotes: [...state.guestNotes.filter(note => note.noteId !== action.payload.noteId), action.payload]
    }
  }),
  on(clearGuestNotes, (state, action) => {
    return { ...state, guestNotes: [] };
  }),
  on(mergeGuestNotes, (state, action) => {
    return { ...state, userNotes: [...state.userNotes, ...state.guestNotes] };
  })
);
