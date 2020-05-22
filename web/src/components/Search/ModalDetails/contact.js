/* eslint-disable react/jsx-filename-extension */
// == Import npm
import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Form, Button, Section, Heading, Columns, Notification } from 'react-bulma-components';
import useInputChange from 'src/store/hooks/useInputChange';
import { actions, displayErrorsMessages } from 'src/store/actions';
import { API_URI } from 'src/store/utils';
import axios from 'axios';

// == Composant
const ContactUser = ({ contactUser, setContactUser, selectedUser, selectedChat }) => {
  const dispatch = useDispatch();
  const [input, handleInputChange] = useInputChange();
  const [messageSent, setMessageSent] = useState(false);
  const [loader, setLoader] = useState(false);
  const { errors } = useSelector((state) => state);

  const handleSubmitMessage = (evt) => {
    evt.preventDefault();
    setLoader(true);
    const data = {};
    data.invited = selectedUser.pseudo;
    data.message = input.message;
    console.log(data);
    axios.post(
      `${API_URI}/chatroom`,
      data,
      { withCredentials: true },
    )
      .then((res) => {
        setMessageSent(true);
        setLoader(false);
        dispatch({ type: actions.CLEAR_ERRORS_MSG });
      })
      .catch((err) => {
        console.log(err.response);
        setLoader(false);
        const { message } = err.response.data;
        dispatch(displayErrorsMessages(message));
      });
  };

  const closeModale = () => {
    input.message = '';
    setContactUser(false);
    setMessageSent(false);
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
    <>
      <Modal closeOnBlur show={contactUser} onClose={closeModale}>
        <Modal.Content>
          <Section style={{ backgroundColor: 'white' }}>
            <Heading renderAs="p" size={5}>Contacter {selectedUser.pseudo}</Heading>
            {(errors) ? <ErrorsMessage /> : null}
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
                <Button loading={loader} type="submit" color="success">Valider</Button>
              </Button.Group>
            </form>
          </Section>
        </Modal.Content>
      </Modal>
      <Modal show={messageSent}>
        <Modal.Content closeOnBlur onClose={closeModale}>
          <Section style={{ backgroundColor: 'white' }}>
            <Notification color="success">
              <Heading size={6}>Message envoyé !</Heading>
              <Heading subtitle size={6}>Si vous désirez continuer la discussion, veuillez vous rendre dans l'onglet messagerie de votre profil.</Heading>
              <Button onClick={closeModale} remove />
            </Notification>
          </Section>
        </Modal.Content>
      </Modal>
    </>
  );
};

// == Export
export default ContactUser;
