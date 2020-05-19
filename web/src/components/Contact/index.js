/* eslint-disable react/jsx-filename-extension */
// == Import npm
import React, { useState } from 'react';
import { Columns, Form, Button, Box, Container, Content, Heading, Notification } from 'react-bulma-components';
import ReactDOM from 'react-dom';

const Contact = () => {
  
  return (
    <Columns>
      <Columns.Column />
      <Columns.Column>
        <Columns>
          <Container>
            <Content style={{ textAlign: 'center' }}>
              <Heading size={4}>Si vous êtes client de Pair2Peer et que vous avez une question, contactez-nous à l'adresse suivante :</Heading>
            </Content>
          </Container>
        </Columns>
        <Columns.Column />
        <Box>
          {/* {(errors) ? <ErrorsMessage /> : null} */}
          <form onSubmit="{handleSubmit}">
            <Form.Field>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Pseudo</Form.Label>
                  <Form.Input required name="name" type="text" value="{pseudo}" onChange="{(e) => setPseudo(e.target.value)}" />
                </Form.Control>
              </Form.Field>

              <Form.Field>
                <Form.Control>
                  <Form.Label>Email</Form.Label>
                  <Form.Input required name="email" type="email" value="{email}" onChange="{(e) => setEmail(e.target.value)}" />
                </Form.Control>
              </Form.Field>
            </Form.Field>
            
            <Form.Control>
              <Form.Label>Message</Form.Label>
              <Form.Input required name="message" type="textarea" rows="15" />
            </Form.Control>

            <Button  style={{ margin:'25px 100px', width:'50%' }} type="submit" color="success">Envoyer</Button>
            <Columns.Column />
          </form>
          <Columns.Column />
          <Columns.Column />
          <Columns>
            {/* <Container>
              <Content style={{ textAlign: 'center' }}>
                <Heading subtitle size={6}><Link to="/login">Déjà inscrit ?</Link></Heading>
              </Content>
            </Container> */}
          </Columns>
        </Box>
      </Columns.Column>
      <Columns.Column />
    </Columns>
  );
};

// == Export
export default Contact;



