import { createSelector } from '@ngrx/store';
import { AppState, GlobalState } from 'src/app/shared/models/store.model';

const globalSelector = (state: AppState) => state.global;

export const isAppProcessing = createSelector(
  globalSelector,
  (state: GlobalState) => state.appProcessing
);

export const isAltertVisible = createSelector(
  globalSelector,
  (state: GlobalState) => state.alertData
);
