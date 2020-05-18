/* eslint-disable react/jsx-filename-extension */
// == Import npm
import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Form, Button, Section, Heading, Columns } from 'react-bulma-components';
import useInputChange from 'src/store/hooks/useInputChange';

// == Composant
const ContactUser = ({ contactUser, setContactUser, selectedUser }) => {
  const [input, handleInputChange] = useInputChange();

  return (
    <Modal closeOnBlur show={contactUser} onClose={() => setContactUser(false)}>
      <Modal.Content>
        <Section style={{ backgroundColor: 'white' }}>
          <Heading renderAs="p" size={5}>Contacter {selectedUser.pseudo}</Heading>
          <form>
            <Columns.Column>
              <Form.Field>
                <Form.Field>
                  <Form.Control>
                    <Form.Label>Pseudo</Form.Label>
                    <Form.Input disabled value={selectedUser.pseudo} name="message" />
                  </Form.Control>
                </Form.Field>
              </Form.Field>
              <Form.Field>
                <Form.Field>
                  <Form.Control>
                    <Form.Label>Message</Form.Label>
                    <Form.Textarea onChange={handleInputChange} name="message" />
                  </Form.Control>
                </Form.Field>
              </Form.Field>
            </Columns.Column>
            <Button.Group position="right">
              <Button type="button" onClick={() => setContactUser(false)} color="danger">Annuler</Button>
              <Button color="success">Valider</Button>
            </Button.Group>
          </form>
        </Section>
      </Modal.Content>
    </Modal>
  );
};

// == Export
export default ContactUser;
