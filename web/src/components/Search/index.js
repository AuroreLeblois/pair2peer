// == Import npm
import React from 'react';
import { Columns, Content } from 'react-bulma-components';

// == Import
import Filter from './filter';
import Results from './results';

// == Composant
const Search = () => {
  return (
    <Columns>
      <Columns.Column>
        <Columns gapless>
          <Content style={{ textAlign: 'center' }}>
            <Filter />
          </Content>
        </Columns>
        <Columns>
          <Columns.Column />
        </Columns>
        <Results />
      </Columns.Column>
    </Columns>
  );
};

// == Export
export default Search;
