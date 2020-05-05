// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Form, Grid, Input } from 'semantic-ui-react';
import { submitLogin } from 'src/store/actions';
import { useInputChange } from './useInputChange';

// == Import

// == Composant
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { errors } = useSelector((state) => state);
  const [input, handleInputChange] = useInputChange();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(input)
    dispatch(submitLogin(history));
  };

  return (
    <Grid centered>
      <Grid.Column width={6}>
        <Form onSubmit={handleSubmit} inverted>
          <Form.Field
            control={Input}
            label="Email"
            type="text"
            name="email"
            placeholder="Email"
            onChange={useInputChange}
          />
          <Form.Field
            control={Input}
            label="Mot de passe"
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={useInputChange}
          />
          <Button type="submit">Connexion</Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

// == Export
export default Login;
