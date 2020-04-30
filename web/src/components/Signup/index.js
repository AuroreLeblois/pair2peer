// == Import

import React from 'react';
// import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react';


// Pour le genre

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]


// == Composant
const C = () => {

  return (
  <Form>
    <Form.Group widths='equal'>
      <Form.Field
        id='form-input-control-first-name'
        control={Input}
        label='First name'
        placeholder='First name'
      />
      <Form.Field
        id='form-input-control-last-name'
        control={Input}
        label='Last name'
        placeholder='Last name'
      />
      <Form.Field
        control={Select}
        options={genderOptions}
        label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
        placeholder='Gender'
        search
        searchInput={{ id: 'form-select-control-gender' }}
      />
    </Form.Group>
    <Form.Field
      id='form-input-control-error-email'
      control={Input}
      label='Email'
      placeholder='joe@schmoe.com'
      error={{
        content: 'Please enter a valid email address',
        pointing: 'below',
      }}
    />
    <Form.Field
      id='form-button-control-public'
      control={Button}
      content="S'inscrire"
    />
  </Form>
  );
};

/**
C.propTypes = {
  value: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};
*/

// == Export
export default C;
