/* eslint-disable react/jsx-filename-extension */
// == Import npm
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { submitSignup } from 'src/store/actions';
import { Columns, Form, Button, Box, Container, Content, Heading } from 'react-bulma-components';
import ReCAPTCHA from "react-google-recaptcha";



const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { usersData } = useSelector((state) => state)
  console.log(usersData);

  // Les hooks
  const [pseudo, setPseudo] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [city, setCity] = React.useState('');
  const [remote, setRemote] = useState('');

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
    };
    dispatch(submitSignup(history, newUser));
  };

  const handleRadioChange = (evt) => {
    const target = evt.target
    setRemote(target.value);
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
          <form onSubmit={handleSubmit}>
            <Form.Field>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Pseudo</Form.Label>
                  <Form.Input name="name" type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                </Form.Control>
              </Form.Field>

              <Form.Field>
                <Form.Control>
                  <Form.Label>Email</Form.Label>
                  <Form.Input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Control>
              </Form.Field>
            </Form.Field>

            <Form.Field>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Control>
              </Form.Field>

              <Form.Field>
                <Form.Control>
                  <Form.Label>Confirmer le mot de passe</Form.Label>
                  <Form.Input name="passwordConfirm" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                </Form.Control>
              </Form.Field>
            </Form.Field>

            <Form.Field>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Ville</Form.Label>
                  <Form.Input name="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Pays</Form.Label>
                  <Form.Input name="country" type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                </Form.Control>
              </Form.Field>
            </Form.Field>

            <Form.Field>
              <Form.Label>Comment souhaitez-vous travailler ?</Form.Label>
              <Form.Control>
                <Form.Radio value="true" name="remote" checked={remote === 'true'} onChange={handleRadioChange}>
                  Remote
                </Form.Radio>
                <Form.Radio value="false" name="remote" checked={remote === 'false'} onChange={handleRadioChange}>
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
                        sitekey="6LdCMPYUAAAAAN5j6Bxfdy1BlFpNwY5gVApE-5b3"
                      />
                    </Content>
                  </Container>
                </Form.Field>
              <Columns.Column />
            </Columns>
            <Button fullwidth type="submit" color="success">Valider</Button>
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
