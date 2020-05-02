// == Import npm
import React from 'react';
import { Grid, Divider, Pagination } from 'semantic-ui-react';


// == Import
import Filter from './filter';
import Results from './results';

// == Composant
const Search = () => {
  return (
    <Grid>
      <Grid.Row>
        <Filter />
        <Results />
      </Grid.Row>
    </Grid>
  );
};

// == Export
export default Search;
