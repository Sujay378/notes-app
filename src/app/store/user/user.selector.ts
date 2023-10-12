import { createSelector } from '@ngrx/store';
import { AppState, UserState } from 'src/app/shared/models/store.model';

const userState = (state: AppState) => state.user;

export const isUserLogged = createSelector(
  userState,
  (state: UserState) => state.loggedIn
);

export const userDetails = createSelector(
  userState,
  (state: UserState) => state.userData
);
