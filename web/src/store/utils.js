/* eslint-disable import/prefer-default-export */
// == URI from server
export const API_URI = 'http://localhost:3000';

// == Utils function to capitalize first letter
export const firstLetterToUppercase = (string) => (
  string.charAt(0).toUpperCase() + string.slice(1)
);
