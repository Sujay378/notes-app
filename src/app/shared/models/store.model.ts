import { Note } from './generic.model';

export interface AppState {
  global: GlobalState;
  user: UserState;
}

export interface GlobalState {
  appProcessing: boolean;
}

export interface UserState {
  loggedIn: boolean;
  userData: {
    userId: string;
    userName: string;
    email: string;
  };
}

export interface NotesState {
  userNotes: Note[];
  guestNotes: Note[];
}
