/* eslint-disable react/jsx-filename-extension */
// == Import npm
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { submitSignup, actions } from 'src/store/actions';
import { Columns, Form, Button, Box, Container, Content, Heading, Notification } from 'react-bulma-components';
import ReCAPTCHA from 'react-google-recaptcha';



const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { usersData, loading, errors } = useSelector((state) => state);
  console.log(usersData);

  // Les hooks
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [remote, setRemote] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');


  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newUser = {
      pseudo,
      email,
      password,
      passwordConfirm,
      country,
      city,
      remote,
      captchaValue,
    };
    dispatch(submitSignup(history, newUser));
    dispatch({ type: actions.SET_LOADER });
  };

  const handleRadioChange = (evt) => {
    const target = evt.target
    setRemote(target.value);
  };

  const handleChange = (captchaValue) => {
    console.log("Captcha value:", captchaValue);
    setCaptchaValue(captchaValue);
  };

  const ErrorsMessage = () => {
    return (
      <Notification color="danger">
        {Object.keys(errors).map((objectKey, index) => (
          <p>{errors[objectKey]}</p>
        ))}
      </Notification>
    );
  };


  return (
    <Columns>
      <Columns.Column />
      <Columns.Column>
        <Columns>
          <Container>
            <Content style={{ textAlign: 'center' }}>
              <Heading size={3}>Inscription</Heading>
              <Heading subtitle size={6}>Rejoignez les {usersData.maxUser} développeurs enregistrés !</Heading>
            </Content>
          </Container>
        </Columns>
        <Columns.Column />
        <Box>
          {(errors) ? <ErrorsMessage /> : null}
          <form onSubmit={handleSubmit}>
            <Form.Field>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Pseudo</Form.Label>
                  <Form.Input required name="name" type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                </Form.Control>
              </Form.Field>

              <Form.Field>
                <Form.Control>
                  <Form.Label>Email</Form.Label>
                  <Form.Input required name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Control>
              </Form.Field>
            </Form.Field>

            <Form.Field>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Input required name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Control>
              </Form.Field>

              <Form.Field>
                <Form.Control>
                  <Form.Label>Confirmer le mot de passe</Form.Label>
                  <Form.Input required name="passwordConfirm" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                </Form.Control>
              </Form.Field>
            </Form.Field>

            <Form.Field>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Ville</Form.Label>
                  <Form.Input required name="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Pays</Form.Label>
                  <Form.Input required name="country" type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                </Form.Control>
              </Form.Field>
            </Form.Field>

            <Form.Field>
              <Form.Label>Comment souhaitez-vous travailler ?</Form.Label>
              <Form.Control>
                <Form.Radio required value="true" name="remote" checked={remote === 'true'} onChange={handleRadioChange}>
                  Remote
                </Form.Radio>
                <Form.Radio required value="false" name="remote" checked={remote === 'false'} onChange={handleRadioChange}>
                  Rencontre
                </Form.Radio>
              </Form.Control>
            </Form.Field>
            <Columns.Column />
            <Columns>
              <Columns.Column />
              <Form.Field>
                <Container>
                  <Content style={{ textAlign: 'center' }}>
                    <ReCAPTCHA
                      required
                      sitekey="6LdCMPYUAAAAAN5j6Bxfdy1BlFpNwY5gVApE-5b3"
                      onChange={handleChange}
                    />
                  </Content>
                </Container>
              </Form.Field>
              <Columns.Column />
            </Columns>
            <Button loading={loading} fullwidth type="submit" color="success">Valider</Button>
            <Columns.Column />
          </form>
          <Columns.Column />
          <Columns.Column />
          <Columns>
            <Container>
              <Content style={{ textAlign: 'center' }}>
                <Heading subtitle size={6}><Link to="/login">Déjà inscrit ?</Link></Heading>
              </Content>
            </Container>
          </Columns>
        </Box>
      </Columns.Column>
      <Columns.Column />
    </Columns>
  );
};

// == Export
export default Signup;
