// == Import

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
// import styled from '@emotion/styled';
import * as Yup from 'yup';
// Semantic
import { Button, Checkbox } from 'semantic-ui-react';

/**
// Validation ==> On passera directement par Yup pour la validation des forms

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};
*/
const MyTextInput = ({ label, ...props }) => {
  // useField () renvoie [formik.getFieldProps (), formik.getFieldMeta ()]
  // que nous pouvons étendre sur <input> et remplacer ErrorMessage.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  // On dit a useField quel type d'input c'est
  // puisque React traite les radios et les cases à cocher différemment
  // que les inputs/select/textarea.
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};



// A faire OU utiliser semantic Ui
/** 
const StyledSelect = styled.select`
  /** ... * /
`;

const StyledErrorMessage = styled.div`
  color: red;
`;

const StyledLabel = styled.label`
 /** ...* /
`;

*/


const Signup = () => {
  return (
    <Formik
      initialValues={
        {
          pseudo:'',
          email: '',
          password:'',
          validationPassword:'',
          remote:'',
          acceptedTerms: false, // Pour la checkbox
        }
      }
      validationSchema = {
        Yup.object (
          {
            pseudo: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
            password: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
            validationPassword: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
            email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
            remote: Yup.boolean()
            .required('Required')
            .oneOf([true], 'You must accept the terms and conditions.'),
            acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'You must accept the terms and conditions.'), // Pour une future Charte de bonne conduite par exemple
          }
        )
      }
      onSubmit = {
        (values, { setSubmitting } ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 0
          );
      }}
    >
      <Form>
        <MyTextInput label="pseudo" />
          <input placeholder='pseudo' />
        <MyTextInput label ="password" />
          <input placeholder='password' />
        <MyTextInput label ="validationPassword" />
          <input placeholder='validationPassword' />
        <MyTextInput label ="email" />
          <input placeholder='email' />
        <MyCheckbox name="acceptedTerms">
            J'accepte les conditions d'utilisation
        </MyCheckbox>
        <Button type='submit'>S'inscrire</Button>
      </Form>
    </Formik>
  );
};

// == Export
export default Signup;
