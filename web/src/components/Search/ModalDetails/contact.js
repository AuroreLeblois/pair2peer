/* eslint-disable react/jsx-filename-extension */
// == Import npm
import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Form, Button, Section, Heading, Columns, Message } from 'react-bulma-components';
import useInputChange from 'src/store/hooks/useInputChange';
import { actions, API_URI } from 'src/store/actions';
import axios from 'axios';
import { MessageContent } from 'semantic-ui-react';

// == Composant
const ContactUser = ({ contactUser, setContactUser, selectedUser, selectedChat }) => {
  const dispatch = useDispatch();
  const [input, handleInputChange] = useInputChange();
  const [messageSent, setMessageSent] = useState(false);
  const { loading } = useSelector((state) => state);

  const handleSubmitMessage = (evt) => {
    evt.preventDefault();
    const data = {};
    data.invited = selectedUser.pseudo;
    data.message = input.message;
    console.log(data);
    dispatch({ type: actions.SET_LOADER });
    axios.post(
      `${API_URI}/chatroom`,
      data,
      { withCredentials: true },
    )
      .then((res) => {
        console.log(res);
        setMessageSent(true);
        dispatch({ type: actions.SET_LOADER });
      })
      .catch((res) => {
        console.log(res);
        dispatch({ type: actions.SET_LOADER });
      });
  };

  const closeModale = () => {
    input.message = '';
    setContactUser(false);
    setMessageSent(false);
  };

  return (
    <>
      <Modal closeOnBlur show={contactUser} onClose={closeModale}>
        <Modal.Content>
          <Section style={{ backgroundColor: 'white' }}>
            <Heading renderAs="p" size={5}>Contacter {selectedUser.pseudo}</Heading>
            <form onSubmit={handleSubmitMessage}>
              <Columns.Column>
                <Form.Field>
                  <Form.Field>
                    <Form.Control>
                      <Form.Label>Pseudo</Form.Label>
                      <Form.Input disabled value={selectedUser.pseudo} name="pseudo" />
                    </Form.Control>
                  </Form.Field>
                </Form.Field>
                <Form.Field>
                  <Form.Field>
                    <Form.Control>
                      <Form.Label>Message</Form.Label>
                      <Form.Textarea onChange={handleInputChange} value={input.message} name="message" />
                    </Form.Control>
                  </Form.Field>
                </Form.Field>
              </Columns.Column>
              <Button.Group position="right">
                <Button type="button" onClick={closeModale} color="danger">Annuler</Button>
                <Button loading={loading} type="submit" color="success">Valider</Button>
              </Button.Group>
            </form>
          </Section>
        </Modal.Content>
      </Modal>
      <Modal show={messageSent}>
        <Modal.Content closeOnBlur onClose={closeModale}>
          <Section style={{ backgroundColor: 'white' }}>
            <Message color="success">
              <Message.Header>
                Message envoyé !
                <Button onClick={closeModale} remove />
              </Message.Header>
              <Message.Body>
                <Heading size={6}>Message envoyé !</Heading>
                <Heading subtitle size={6}>Si vous désirez continuer la discussion, veuillez vous rendre dans l'onglet messagerie de votre profil.</Heading>
              </Message.Body>
            </Message>
          </Section>
        </Modal.Content>
      </Modal>
    </>
  );
};

// == Export
export default ContactUser;
