import { Note } from './generic.model';

export interface AppState {
  global: GlobalState;
  user: UserState;
  note: NotesState;
}

export interface GlobalState {
  appProcessing: boolean;
  alertVisible: boolean;
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
  userNotesLoaded: boolean;
  selectedNote: Note | null;
  userNotes: Note[];
  guestNotes: Note[];
}
