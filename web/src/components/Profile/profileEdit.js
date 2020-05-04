// == Import npm
import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react';

// == Composant
const ProfileEdit = () => {
  const user = useSelector((state) => state.user);

  return (
    <Form size="tiny" inverted>
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          label="First name"
          placeholder="First name"
        />
        <Form.Field
          id="form-input-control-last-name"
          control={Input}
          label="Last name"
          placeholder="Last name"
        />
      </Form.Group>
      <Form.Field
        control={Select}
        label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
        placeholder="Gender"
        search
      />
    </Form>
  );
};

// == Export
export default ProfileEdit;
