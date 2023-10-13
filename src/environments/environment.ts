export const environment = {
  production: false,
  protocol: 'http:',
  host: 'localhost:3000',
  api: {
    auth: {
      register: 'api/auth/register',
      login: 'api/auth/login',
    },
    note: {
      fetchall: 'api/note/fetchall',
      add: 'api/note/add/single',
      merge: 'api/note/add/multiple',
      remove: 'api/note/delete/single',
      update: 'api/note/update/single',
    },
  },
};
