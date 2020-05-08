// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { submitLogin } from 'src/store/actions';
import useInputChange from 'src/store/hooks/useInputChange';
import { Button, Form, Box, Columns, Heading, Content, Container } from 'react-bulma-components';

// == Import

// == Composant
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { errors } = useSelector((state) => state);
  const [input, handleInputChange] = useInputChange();

  const ErrorMessage = ({ message }) => (
    <Form.Help color="danger">{message}</Form.Help>
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(submitLogin(history, input));
  };

  return (
    <>
      <Columns gapless>
        <Columns.Column />
        <Columns.Column>
          <Columns>
            <Container>
              <Content style={{ textAlign: 'center' }}>
                <Heading size={3}>Connexion</Heading>
                <Heading subtitle size={6}>Et commencez à travailler</Heading>
              </Content>
            </Container>
          </Columns>
          <Columns.Column />
          <Box>
            <form onSubmit={handleSubmit}>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Email</Form.Label>
                  <Form.Input name="email" onChange={handleInputChange} value={input.email} />
                  {(errors && errors.errorEmail) ? <ErrorMessage message={errors.errorEmail} /> : null}
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Input name="password" type="password" onChange={handleInputChange} value={input.password} />
                  {(errors && errors.errorPassword) ? <ErrorMessage message={errors.errorPassword} /> : null}
                </Form.Control>
              </Form.Field>
              <Columns.Column />
              <Button fullwidth color="success">Connexion</Button>
            </form>
            <Columns.Column />
            <Columns.Column />
            <Columns>
              <Container>
                <Content style={{ textAlign: 'center' }}>
                  <Heading subtitle size={6}><Link to="/signup">Pas encore inscrit ?</Link></Heading>
                </Content>
              </Container>
            </Columns>
          </Box>
        </Columns.Column>
        <Columns.Column />
      </Columns>
    </>
  );
};

// == Export
export default Login;
