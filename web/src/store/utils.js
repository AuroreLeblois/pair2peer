/* eslint-disable import/prefer-default-export */
// == URI from server
export const API_URI = 'http://localhost:3000';

export const buildSearchData = (data) => {
  const filters = {};
  const users = {};
  filters.it_language = data.it_language.name;
  filters.language = data.language.name;
  filters.localisation = data.localisation;
  users.maxPage = data.maxPage.count;
  users.maxUsers = data.maxUser.count;
  users.users = data.users;
  return { filters, users };
};

export const firstLetterToUppercase = (string) => (
  string.charAt(0).toUpperCase() + string.slice(1)
);
