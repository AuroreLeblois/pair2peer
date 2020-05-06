// == Import npm
import React, { useEffect, useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Radio } from 'semantic-ui-react';

//************************************************* */

// == Composant
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

/** 
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
*/


const Signup = () => {

  // Les hooks
  const [pseudo, setPseudo] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [city, setCity] = React.useState("");
  const [remote, setRemote] = React.useState(false);
  const [radioValue, setRadioValue] = useState();

  const handleSubmit = () => {
    console.log (`
      pseudo: ${pseudo}
      mail: ${email}
      password: ${password}
      passwordConfirm: ${passwordConfirm}
      country: ${country}
      city: ${city}
      remote: ${remote}
    `);
    event.preventDefault ();

    // ******************************************************************************
    // AXIOS ?
    const newUser = {
    };

    axios.post(
      `http://localhost:3000/signup`,
    {
      newUser
    })
    .then((res) => {
      const data = res.data
      const newUser = {};
      
    })
    .catch(function (error) {
      console.log(error);
      console.log("bonjour je suis l\'erreur");
    });

  };

  const handleRadioChange = (evt, result) => {
    setRadioValue(result.value);
  };
  

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
          // role:'',
          // acceptedTerms: false, // Pour la checkbox
        }
      }

      // Gerer coté back mais possibilité de rajout en front ??
      validationSchema = {
        Yup.object (
          {
            pseudo: Yup.string()
            .max(15)
            .required('Obligatoire'),
            country: Yup.string()
            .max(15)
            .required('Obligatoire'),
            city: Yup.string()
            .max(15)
            .required('Obligatoire'),
            email: Yup.string()
            .email('Invalid email address')
            .required('Obligatoire'),
            remote: Yup.boolean(),
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
      >
      
      <Form 
      className = "ui form"
      onSubmit = { handleSubmit }
      >
          <MyTextInput
            label="Pseudo"
            name="pseudo"
            type="text"
            placeholder="Jane57"
            value={pseudo}
            onChange={e => setPseudo(e.target.value)}
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
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <MyTextInput
            label="Confirmation de mot de passe"
            name="passwordConfirm"
            type="password"
            placeholder=""
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
          />
          <MyTextInput
            label="Pays"
            name="country"
            type="text"
            placeholder="France"
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
          <MyTextInput
          label="Ville"
          name="city"
          type="text"
          placeholder="Strasbourg"
          value={city}
          onChange={e => setCity(e.target.value)}
          />



          <p> Je veux travailler en remote </p>

          <Radio
            label='Oui'
            name='remote'
            value='true'
            checked={radioValue === 'true'}
            onChange={handleRadioChange}
            onClick={e => setRemote(!e.target.value)}
          />

          <Radio
            label='Non'
            name='remote'
            value='false'
            checked={radioValue === 'false'}
            onClick={e => setRemote(e.target.value === false)}

            onChange={handleRadioChange}
          />
        
          <button 
          className="ui button" 
          type="submit" 
          onClick={() => {
            setPseudo(pseudo)
            setEmail(email)
            setPassword(password)
            setPasswordConfirm(passwordConfirm)
            setCountry(country)
            setCity(city)
            setRemote(remote)
          }
        }
          >
            S'inscrire
          </button>
        </Form>
    </Formik>
  );
};

// == Export
export default Signup;
