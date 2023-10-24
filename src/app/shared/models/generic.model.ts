export interface User {
  userId: string;
  userName: string;
  email: string;
}

export interface Note {
  noteId?: string;
  noteTitle: string;
  pages: Page[];
}

interface Page {
  pageTitle: string;
  sections: Section[];
}

interface Section {
  header: string;
  body: string;
}
