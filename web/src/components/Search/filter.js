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
    <Grid.Column width={4}>
      <Form size="mini" inverted>
        <Form.Field>
          <Input
            placeholder="Pseudo"
          />
        </Form.Field>
        <Form.Field>
          <Select
            options={options}
            placeholder="Language"
          />
        </Form.Field>
        <Form.Field>
          <Select
            options={options}
            placeholder="Niveau"
          />
        </Form.Field>
        <Form.Field>
          <Input
            placeholder="Pays"
          />
        </Form.Field>
        <Form.Field>
          <Input
            placeholder="Ville"
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
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