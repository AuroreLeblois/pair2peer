/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Columns, Form, Button, Box, Container, Content, Heading, Notification } from 'react-bulma-components';
import { actions } from 'src/store/actions';
import { API_URI } from 'src/store/utils';
import axios from 'axios';

const Contact = () => {
  const dispatch = useDispatch();
  const { user, loading, errors } = useSelector((state) => state);
  const [messageSent, setMessageSent] = useState(false);

  // Les hooks
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch({ type: actions.SET_LOADER });
    const newMessage = {
      name,
      email,
      message,
    };
    axios.post(
      `${API_URI}/contact`,
      newMessage,
    )
      .then((res) => {
        console.log(res);
        setMessageSent(true);
        dispatch({ type: actions.SET_LOADER });
        dispatch({ type: actions.CLEAR_ERRORS_MSG });
      })
      .catch((err) => {
        // Au cas où erreur avec le serveur, renvoie un console.log
        console.log(err.response);
        dispatch({ type: actions.SET_LOADER });
      });
  };

  // const ErrorsMessage = () => {
  //   return (
  //     <Notification color="danger">
  //       {Object.keys(errors).map((objectKey, index) => (
  //         <p>{errors[objectKey]}</p>
  //       ))}
  //     </Notification>
  //   );
  // };
  if (messageSent) {
    return (
      <Columns>
        <Columns.Column />
        <Columns.Column size={7}>
          <Notification color="success">
            <p>Merci pour votre message.</p>
            <p>Notre équipe y répondra dès que possible.</p>
          </Notification>
        </Columns.Column>
        <Columns.Column />
      </Columns>
    );
  }

  return (
    <Columns>
      <Columns.Column />
      <Columns.Column size={7}>
        <Columns>
          <Container>
            <Content style={{ textAlign: 'center' }}>
              <Heading size={3}>Nous contacter</Heading>
              <Heading subtitle size={6}>Pour toute remarque ou question</Heading>
            </Content>
          </Container>
        </Columns>
        <Columns.Column />
        <Box>
          <form onSubmit={handleSubmit}>
            <Form.Field>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Nom :</Form.Label>
                  <Form.Input required type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Mail :</Form.Label>
                  <Form.Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Control>
              </Form.Field>
            </Form.Field>
            <Form.Field>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Message :</Form.Label>
                  <Form.Field>
                    <Form.Control>
                      <Form.Textarea required placeholder="Votre message" value={message} onChange={(e) => setMessage(e.target.value)} />
                    </Form.Control>
                  </Form.Field>
                </Form.Control>
              </Form.Field>
            </Form.Field>
            <Button fullwidth loading={loading} type="submit" color="success">Envoyer</Button>
          </form>
        </Box>
      </Columns.Column>
      <Columns.Column />
    </Columns>
  );
};

export default Contact;
