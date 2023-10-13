import { createAction, props } from '@ngrx/store';

enum ActionTypes {
  appProcessing = '[GLOBAL] updateAppProcessing',
  showAlert = '[GLOBAL] show alert',
  hideAlert = '[Global] hide alert',
}

export const setAppProcessing = createAction(
  ActionTypes.appProcessing,
  props<{ payload: boolean }>()
);

export const showAlert = createAction(
  ActionTypes.showAlert,
  props<{ payload: { type: string; message: string } }>()
);

export const hideAlert = createAction(ActionTypes.hideAlert);
