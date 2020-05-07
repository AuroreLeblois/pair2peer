// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { submitLogin } from 'src/store/actions';
import useInputChange from 'src/store/hooks/useInputChange';
import { Button, Form, Box, Columns } from 'react-bulma-components';

// == Import

// == Composant
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { errors } = useSelector((state) => state);
  const [input, handleInputChange] = useInputChange();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(submitLogin(history, input));
  };

  return (
    <Columns gapless>
      <Columns.Column />
      <Columns.Column>
        <Box>
          <form onSubmit={handleSubmit}>
            <Form.Field>
              <Form.Control>
                <Form.Label>Email</Form.Label>
                <Form.Input name="email" onChange={handleInputChange} value={input.email} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Control>
                <Form.Label>Mot de passe</Form.Label>
                <Form.Input name="password" type="password" onChange={handleInputChange} value={input.password} />
              </Form.Control>
            </Form.Field>
            <Button.Group position="centered">
              <Button color="info">Connexion</Button>
            </Button.Group>
          </form>
        </Box>
      </Columns.Column>
      <Columns.Column />
    </Columns>
  );
};

// == Export
export default Login;
