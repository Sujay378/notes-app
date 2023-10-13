import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../shared/models/store.model';
import { globalReducer } from './global/global.reducer';
import { userReducer } from './user/user.reducer';
import { notesReducer } from './notes/notes.reducer';
import { NotesEffect } from './notes/notes.effect';
import { GlobalEffect } from './global/global.effect';

export const reducers: ActionReducerMap<AppState> = {
  global: globalReducer,
  user: userReducer,
  note: notesReducer,
};

export const effects = [NotesEffect, GlobalEffect];

export * from './global/global.action';
export * from './global/global.selector';

export * from './user/user.action';
export * from './user/user.selector';

export * from './notes/notes.action';
export * from './notes/notes.selector';
