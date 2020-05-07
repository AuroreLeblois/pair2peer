// == Import npm
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { submitSignup } from 'src/store/actions';
import { Columns, Form, Button, Container, Box } from 'react-bulma-components';

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
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
    <Columns gapless>
      <Columns.Column />
      <Box>
        <Columns.Column>
          <form onSubmit={handleSubmit}>
            <Form.Field>
              <Form.Field.Body>
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
              </Form.Field.Body>
            </Form.Field>

            <Form.Field>
              <Form.Field.Body>
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
              </Form.Field.Body>
            </Form.Field>

            <Form.Field>
              <Form.Field.Body>
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
              </Form.Field.Body>
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
            <Button.Group position="right">
              <Button type="submit" color="info">Valider</Button>
            </Button.Group>
          </form>
        </Columns.Column>
      </Box>
      <Columns.Column />
    </Columns>
  );
};

// == Export
export default Signup;
