import { createReducer, on } from '@ngrx/store';
import { NotesState } from 'src/app/shared/models/store.model';
import {
  addGuestNote,
  removeUserNote,
  addUserNote,
  mergeGuestNotes,
  removeGuestNote,
  clearGuestNotes,
} from './notes.action';

const initialState: NotesState = {
  userNotes: [],
  guestNotes: [],
};

export const notesReducer = createReducer(
  initialState,
  on(addGuestNote, (state, action) => {
    return { ...state, guestNotes: [...state.guestNotes, action.payload] };
  }),
  on(addUserNote, (state, action) => {
    return { ...state, userNotes: [...state.userNotes, action.payload] };
  }),
  on(removeGuestNote, (state, action) => {
    return {
      ...state,
      guestNotes: state.guestNotes.filter(
        (note) =>
          note.title !== action.payload.title &&
          note.description !== action.payload.description
      ),
    };
  }),
  on(removeUserNote, (state, action) => {
    return {
      ...state,
      userNotes: state.userNotes.filter(
        (note) =>
          note.title !== action.payload.title &&
          note.description !== action.payload.description
      ),
    };
  }),
  on(clearGuestNotes, (state, action) => {
    return { ...state, guestNotes: [] };
  }),
  on(mergeGuestNotes, (state, action) => {
    return { ...state, userNotes: [...state.userNotes, ...state.guestNotes] };
  })
);
