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
    },
  },
};
