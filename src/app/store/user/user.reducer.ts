import { createReducer, on } from '@ngrx/store';
import { UserState } from 'src/app/shared/models/store.model';

import { loadUser, removeUser } from './user.action';

const initialState: UserState = {
  loggedIn: false,
  userData: {
    userId: '',
    userName: '',
    email: '',
  },
};

export const userReducer = createReducer(
  initialState,
  on(loadUser, (state, action) => {
    return { ...state, loggedIn: true, userData: action.payload };
  }),
  on(removeUser, (state, action) => {
    return {
      loggedIn: false,
      userData: {
        userId: '',
        userName: '',
        email: '',
      },
    };
  })
);
