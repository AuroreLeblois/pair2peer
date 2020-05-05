// == Import npm
import React from 'react';
import { Input, Dropdown, Form, Header } from 'semantic-ui-react';

// == Composant
const ITSkills = ({ it_language }) => {
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

  const ITButton = () => {
    return it_language.map((techno) => {
      return (
        <Form.Field>
          <Input
            disabled
            label={<Dropdown defaultValue={techno.level.toString()} options={lvlOptions} />}
            labelPosition="right"
            value={techno.name}
          />
        </Form.Field>
      )
    });
  };

  return (
    <>
      <Header as="h6" inverted>Technologies</Header>
      <Form.Group widths="4">
        <ITButton />
      </Form.Group>
    </>
  );
};

// == Export
export default ITSkills;