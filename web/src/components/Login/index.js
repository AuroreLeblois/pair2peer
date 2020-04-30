// == Import npm
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Form, Grid } from 'semantic-ui-react'
import { syncLogin, submitLogin } from 'src/store/actions';

// == Import

// == Composant
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(submitLogin(history));
  };

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    dispatch(syncLogin(name, value))
  }
  
  return (
    <Grid centered>
      <Grid.Column width="6">
        <Form onSubmit={handleSubmit} inverted>
          <Form.Field>
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder='Email'
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder='Mot de passe'
              onChange={handleChange}
            />
          </Form.Field>
          <Button type='submit'>Connexion</Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

// == Export
export default Login;