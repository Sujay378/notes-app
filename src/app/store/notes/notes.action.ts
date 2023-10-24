import { createAction, createSelector, props } from '@ngrx/store';
import { Note } from 'src/app/shared/models/generic.model';

export const sendUserNoteToBackend = createAction(
  '[NOTES] add user note',
  props<{ payload: Note }>()
);

export const updateBackendUserNotes = createAction(
  '[NOTES] update backend user notes',
  props<{ payload: Note[] }>()
);

export const mergeUserNote = createAction(
  '[NOTES] add user note',
  props<{ payload: Note }>()
);

export const initiateRemovingUserNote = createAction(
  '[NOTES] delete note',
  props<{ payload: Note }>()
);

export const finishRemovingUserNote = createAction(
  '[NOTES] delete note',
  props<{ payload: Note }>()
);

export const addGuestNote = createAction(
  '[NOTES] add user note',
  props<{ payload: Note }>()
);

export const removeGuestNote = createAction(
  '[NOTES] delete note',
  props<{ payload: Note }>()
);

export const updateUserNote = createAction(
  '[NOTES] update user note',
  props<{ payload: Note }>()
);

export const updateGuestNote = createAction(
  '[NOTES] update guest note',
  props<{ payload: Note }>()
);

export const clearGuestNotes = createAction('[NOTES] clear guest notes');

export const mergeGuestNotes = createAction('[NOTES] merge guest notes');

export const setSelectedNote = createAction(
  '[NOTE] set current selected note',
  props<{ payload: { index: number; guest: boolean } }>()
);
