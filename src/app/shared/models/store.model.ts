import { Note } from './generic.model';

export interface AppState {
  global: GlobalState;
  user: UserState;
  note: NotesState;
}

export interface GlobalState {
  appProcessing: boolean;
  alertData: {
    visible: boolean;
    type: string;
    message: string;
  };
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
