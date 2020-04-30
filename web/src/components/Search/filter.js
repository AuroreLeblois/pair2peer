// == Import npm
import React from 'react';
import { Button, Checkbox, Form, Input, Select, Grid } from 'semantic-ui-react'

// == Import

// == Composant
const Filter = () => {
  const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]

  return (
    <Grid.Column width={5}>
      <Form>
        <Input
          placeholder='Pseudo'
        />
        <Select
          options={options}
          placeholder='Language'
        />
        <Select
          options={options}
          placeholder='Niveau'
        />
        <Input
          placeholder='Pays'
        />
        <Input
          placeholder='Ville'
        />
        <Checkbox
        toggle
        label='Remote'
        />
        <Checkbox
        toggle
        label='IRL'
        />
        <Button type='submit'>Filtrer</Button>
      </Form>
    </Grid.Column>
  );
};

// == Export
export default Filter;