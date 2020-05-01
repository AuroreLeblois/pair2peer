/* eslint-disable import/prefer-default-export */
export const getFiltersData = (data) => {
  const filters = {};
  filters.it_language = data.it_language.name;
  filters.language = data.language.name;
  filters.localisation = data.localisation
  return filters;
};
