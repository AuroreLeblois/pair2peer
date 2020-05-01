// == Import npm
import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Divider } from 'semantic-ui-react';

// == Import
import Filter from './filter';
import Results from './results';

// == Composant
const Search = () => {
  return (
    <Grid>
      <Filter />
      <Results />
    </Grid>
  );
};

// == Export
export default Search;