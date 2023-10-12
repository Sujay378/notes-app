import { createAction, props } from '@ngrx/store';

enum ActionTypes {
  appProcessing = '[GLOBAL] updateAppProcessing',
}

export const setAppProcessing = createAction(
  ActionTypes.appProcessing,
  props<{ payload: boolean }>()
);
