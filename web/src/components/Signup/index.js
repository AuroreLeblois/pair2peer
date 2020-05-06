// == Import npm
import React, { useEffect, useState } from 'react';
// import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Radio, Form, Button, Input, Header, Grid } from 'semantic-ui-react';

const Signup = () => {

  // Les hooks
  const [pseudo, setPseudo] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [city, setCity] = React.useState("");
  const [radioValue, setRadioValue] = useState();

  const handleSubmit = () => {
    event.preventDefault ();
    const newUser = {
      pseudo,
      email,
      password,
      passwordConfirm,
      country,
      city,
      remote: radioValue,
    };
    console.log(newUser)
    axios.post(
      'http://localhost:3000/signup',
      newUser,
      { withCredentials: true },
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };

  const handleRadioChange = (evt, result) => {
    setRadioValue(result.value);
  };
  

  return (
      // <Formik
      //   initialValues={
      //   {
      //     pseudo:'',
      //     email: '',
      //     password:'',
      //     passwordConfirm:'',
      //     country:'',
      //     city:'',
      //     remote:'',
      //     // role:'',
      //     // acceptedTerms: false, // Pour la checkbox
      //   }
      // }

      // // Gerer coté back mais possibilité de rajout en front ??
      // validationSchema = {
      //   Yup.object (
      //     {
      //       pseudo: Yup.string()
      //       .max(15)
      //       .required('Obligatoire'),
      //       country: Yup.string()
      //       .max(15)
      //       .required('Obligatoire'),
      //       city: Yup.string()
      //       .max(15)
      //       .required('Obligatoire'),
      //       email: Yup.string()
      //       .email('Invalid email address')
      //       .required('Obligatoire'),
      //       remote: Yup.boolean(),
      //       //acceptedTerms: Yup.boolean()
      //       //.required('Required')
      //       //.oneOf([true], 'You must accept the terms and conditions.'), // Pour une future Charte de bonne conduite par exemple
      //     }
      //   ).shape({
      //     password: Yup.string().required("Obligatoire"),
      //     passwordConfirm: Yup.string().when("password", {
      //       is: val => (val && val.length > 0 ? true : false),
      //       then: Yup.string().oneOf(
      //         [Yup.ref("password")],
      //         "Both password need to be the same"
      //       )
      //     })
      //   })
      // }

      // onSubmit = {
      //   (values, { setSubmitting } ) => {
      //     setTimeout(() => {
      //       alert(JSON.stringify(values, null, 2));
      //       setSubmitting(false);
      //     }, 400
      //     );
      //   }}
      // >
      
    <Grid centered>
      <Grid.Column width={8}>
        <Form
          inverted
          className="ui form"
          onSubmit={handleSubmit}
          size="tiny"
        >
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Pseudo"
              name="pseudo"
              placeholder="Jane57"
              onChange={e => setPseudo(e.target.value)}
            />
            <Form.Field
              control={Input}
              label="Mail"
              name="email"
              type="email"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Mot de passe"
              name="password"
              type="password"
              placeholder=""
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Form.Field
              control={Input}
              label="Confirmation de mot de passe"
              name="passwordConfirm"
              type="password"
              placeholder=""
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Pays"
              name="country"
              type="text"
              placeholder="France"
              value={country}
              onChange={e => setCountry(e.target.value)}
            />
            <Form.Field
              control={Input}
              label="Ville"
              name="city"
              type="text"
              placeholder="Strasbourg"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </Form.Group>

          <Header as="h6" inverted> Je veux travailler en remote </Header>
          <Form.Field>
            <Radio
              label="Oui"
              name="remote"
              value="true"
              checked={radioValue === 'true'}
              onChange={handleRadioChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Non"
              name="remote"
              value="false"
              checked={radioValue === 'false'}
              onChange={handleRadioChange}
            />
          </Form.Field>
          <Button
            type="submit"
          >
            S'inscrire
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

// == Export
export default Signup;
