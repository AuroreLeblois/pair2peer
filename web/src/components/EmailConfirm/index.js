import React, { useState } from 'react';
import { Button } from 'react-bulma-components';

const EmailConfirm = () => {
  const path = window.location.pathname; // recupérer l'url
  const pathArray = path.split(new RegExp('/')); // cut l'url en un tableau
  console.log(pathArray);
  const categoryFolder = pathArray[2]; // après t'as juste a récup l'index qui va bien
  const subCategoryFolder = pathArray[3];

  return (
    <h1>Confirmation</h1>
  );
};

export default EmailConfirm;