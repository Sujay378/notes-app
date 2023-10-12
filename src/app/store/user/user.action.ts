import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/models/generic.model';

enum UserActions {
  loadUser = '[USER] loadUser',
  removeUser = '[USER] removeUserData',
}

export const loadUser = createAction(
  UserActions.loadUser,
  props<{ payload: User }>()
);

export const removeUser = createAction(UserActions.removeUser);
