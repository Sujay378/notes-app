export const environment = {
  production: false,
  protocol: 'http:',
  host: 'localhost:3000',
  api: {
    auth: {
      register: 'api/auth/register',
      login: 'api/auth/login',
      forgot: 'api/auth/forgot/password',
      reset: 'api/auth/reset//password',
    },
    note: {
      fetchall: 'api/note/fetchall',
      fetchUserNotes: 'api/note/userNotes',
      add: 'api/note/add/single',
      merge: 'api/note/add/multiple',
      remove: 'api/note/delete/single',
      update: 'api/note/update/single',
    },
  },
};
