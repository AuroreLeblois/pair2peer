/* eslint-disable import/prefer-default-export */
// == URI from server
export const API_URI = 'http://ec2-100-25-41-105.compute-1.amazonaws.com:3000';

// == Utils function to capitalize first letter
export const firstLetterToUppercase = (string) => (
  string.charAt(0).toUpperCase() + string.slice(1)
);

export const cutStringToNCharacter = (string, length) => {
  if (string) {
    return string.substring(0, length);
  }
};
