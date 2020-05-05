
// == Import

import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
// ES2015 module syntax
import { Form, Field } from '@progress/kendo-react-form';
import './styles.css';
// import styled from '@emotion/styled';
import * as Yup from 'yup';
// Semantic
import { Button, Checkbox } from 'semantic-ui-react';



//************************************************* */


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

  // Les hooks
  const [pseudo, setPseudo] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [city, setCity] = React.useState("");





  return (
    <Formik
      initialValues={
        {
          pseudo:'',
          email: '',
          password:'',
          passwordConfirm:'',
          country:'',
          city:'',
          remote:'',
          role:'defaut ??',
          // acceptedTerms: false, // Pour la checkbox
        }
      }

      // Gerer coté back mais possibilité de rajout en front ??
      validationSchema = {
        Yup.object (
          {
            pseudo: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Obligatoire'),
            country: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Obligatoire'),
            city: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Obligatoire'),
            email: Yup.string()
            .email('Invalid email address')
            .required('Obligatoire'),
            remote: Yup.boolean()
            .required('Obligatoire')
            .oneOf([true], 'You must accept the terms and conditions.'),
            //acceptedTerms: Yup.boolean()
            //.required('Required')
            //.oneOf([true], 'You must accept the terms and conditions.'), // Pour une future Charte de bonne conduite par exemple
          }
        ).shape({
          password: Yup.string().required("Obligatoire"),
          passwordConfirm: Yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("password")],
              "Both password need to be the same"
            )
          })
        })
      }



      onSubmit = {
        (values, { setSubmitting } ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400
          );
      }}
      // Possibilité de faire un forEach de l'objet Yup pour construire chaque form ??
    >
      
      <Form className = "ui form">
          <MyTextInput
            label="Pseudo"
            name="pseudo"
            type="text"
            placeholder="Jane57"
          />
          <MyTextInput
            label="Mail"
            name="email"
            error={{
              content: 'Une adresse mail valide pardi !',
              pointing: 'below',
            }}
            type="email"
            placeholder="jane@formik.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <MyTextInput
            label="Mot de passe"
            name="password"
            type="password"
            placeholder=""
          />
          <MyTextInput
            label="Confirmation de mot de passe"
            name="passwordConfirm"
            type="password"
            placeholder=""
          />
          <MyTextInput
            label="Pays"
            name="country"
            type="text"
            placeholder="France"
          />
          <MyTextInput
          label="Ville"
          name="city"
          type="text"
          placeholder="Strasbourg"
        />
          <MyCheckbox
            name="remote"
            type="checkbox"            
          >Voulez-vous travailler en remote ?
          </MyCheckbox>
          {/* <MyCheckbox name="acceptedTerms">
            J'accepte les conditions d'utilisations
          </MyCheckbox> */}

          <button className="ui button" type="submit">S'inscrire</button>
        </Form>
    </Formik>
  );
};

// == Export
export default Signup;
