/* eslint-disable no-plusplus */
// == Import npm
import React from 'react';
import { Button, Checkbox, Form, Input, Select, Grid } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

// == Import

// == Composant
const Filter = () => {
  let key = 1;
  const { filters } = useSelector((state) => state);

  const itOptions = () => (filters.it_language.map((language) => ({
    key: key++,
    text: language,
    value: language,
  })));

  const langOptions = () => (filters.language.map((language) => ({
    key: key++,
    text: language,
    value: language,
  })));

  const lvlOptions = [
    { key: '1', text: '1', value: '1' },
    { key: '2', text: '2', value: '2' },
    { key: '3', text: '3', value: '3' },
    { key: '4', text: '4', value: '4' },
    { key: '5', text: '5', value: '5' },
    { key: '6', text: '6', value: '6' },
    { key: '7', text: '7', value: '7' },
    { key: '8', text: '8', value: '8' },
    { key: '9', text: '9', value: '9' },
    { key: '10', text: '10', value: '10' },
  ];

  return (
    <Grid.Column width={4}>
      <Form size="mini" inverted>
        <Form.Field>
          <Select
            name="language"
            options={langOptions()}
            placeholder="Langue"
          />
        </Form.Field>
        <Form.Field>
          <Select
            name="it_language"
            options={itOptions()}
            placeholder="Technologie"
          />
        </Form.Field>
        <Form.Field>
          <Select
            name="level"
            options={lvlOptions}
            placeholder="Niveau"
          />
        </Form.Field>
        <Form.Field>
          <Input
            name="country"
            placeholder="Pays"
          />
        </Form.Field>
        <Form.Field>
          <Input
            name="city"
            placeholder="Ville"
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            name="remote"
            label="Remote"
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="IRL"
          />
        </Form.Field>
        <Button type="submit">Filtrer</Button>
      </Form>
    </Grid.Column>
  );
};

// == Export
export default Filter;