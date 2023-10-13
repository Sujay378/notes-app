import { createAction, props } from '@ngrx/store';
import { Note } from 'src/app/shared/models/generic.model';

export const addUserNote = createAction(
  '[NOTES] add user note',
  props<{ payload: Note }>()
);

export const removeUserNote = createAction(
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
