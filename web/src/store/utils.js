/* eslint-disable import/prefer-default-export */
// == URI from server
export const API_URI = 'http://localhost:3000';

// export const buildSearchData = (data) => {
//   const users = {};
//   users.maxPage = data.maxPage.count;
//   users.maxUsers = data.maxUser.count;
//   users.users = data.users;
//   return { users };
// };

export const firstLetterToUppercase = (string) => (
  string.charAt(0).toUpperCase() + string.slice(1)
);
