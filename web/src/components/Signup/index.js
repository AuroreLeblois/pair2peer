// == Import

import React from 'react';
// import ReactDOM from 'react-dom';
 import PropTypes from 'prop-types';


// == Composant
const C = ({ value, handleChange }) => {
  return (
    <form>
      <input
        type="text"
        value={value} // Forcage de l'affichage de la valeur 
        onChange={handleChange} // possibilité de modifier la valeur
      />
    </form>
  );
};

C.propTypes = {
  value: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};


// == Export
export default C;
