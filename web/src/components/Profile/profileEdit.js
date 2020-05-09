// == Import npm
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { firstLetterToUppercase } from 'src/store/utils';
import { Columns, Container, Heading, Form, Button, Modal, Section } from 'react-bulma-components';

// == Composant
const ProfileEdit = () => {
  const { user } = useSelector((state) => state);
  const [openModal, setOpenModal] = useState(false);
  const [userInfos, setUserInfos] = useState({
    pseudo: user.pseudo,
    email: user.email,
    password: '',
    passwordConfirm: '',
    city: firstLetterToUppercase(user.city),
    country: firstLetterToUppercase(user.country),
    remote: user.remote,
  });

  const handleChange = ({ target }) => {
    setUserInfos({ ...userInfos, [target.name]: target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(userInfos);
    setOpenModal(false);
  };

  return (
    <>
      <Columns.Column>
        <Container>
          <form>
            <Form.Field>
              <Form.Field.Body>
                <Form.Field>
                  <Form.Control>
                    <Form.Label>Pseudo</Form.Label>
                    <Form.Input value={userInfos.pseudo} name="name" onChange={handleChange} />
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Control>
                    <Form.Label>Email</Form.Label>
                    <Form.Input value={userInfos.email} name="email" type="email" onChange={handleChange} />
                  </Form.Control>
                </Form.Field>
              </Form.Field.Body>
            </Form.Field>

            <Form.Field>
              <Form.Field.Body>
                <Form.Field>
                  <Form.Control>
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Input value={userInfos.password} name="password" type="password" onChange={handleChange} />
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Control>
                    <Form.Label>Confirmer le mot de passe</Form.Label>
                    <Form.Input value={userInfos.passwordConfirm} name="passwordConfirm" type="password" onChange={handleChange} />
                  </Form.Control>
                </Form.Field>
              </Form.Field.Body>
            </Form.Field>

            <Form.Field>
              <Form.Field.Body>
                <Form.Field>
                  <Form.Control>
                    <Form.Label>Ville</Form.Label>
                    <Form.Input value={userInfos.city} name="city" type="text" onChange={handleChange} />
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Control>
                    <Form.Label>Pays</Form.Label>
                    <Form.Input value={userInfos.country} name="country" type="text" onChange={handleChange} />
                  </Form.Control>
                </Form.Field>
              </Form.Field.Body>
            </Form.Field>
            <Form.Field>
              <Form.Label>Comment souhaitez-vous travailler ?</Form.Label>
              <Form.Control>
                <Form.Radio onChange={handleChange} checked={userInfos.remote === true} value="true" name="remote">
                  Remote
                </Form.Radio>
                <Form.Radio onChange={handleChange} checked={userInfos.remote === false} value="false" name="remote">
                  Rencontre
                </Form.Radio>
              </Form.Control>
            </Form.Field>
            <Button.Group position="right">
              <Button renderAs="a" onClick={() => setOpenModal(true)} color="success">Sauvegarder</Button>
            </Button.Group>
            <Modal closeOnBlur show={openModal} onClose={() => setOpenModal(false)}>
              <Modal.Content>
                <Section style={{ backgroundColor: 'white' }}>
                  <Heading renderAs="p" size={5}>Êtes-vous sur de vos informations ?</Heading>
                  <Button.Group position="right">
                    <Button onClick={() => setOpenModal(false)} color="danger">Annuler</Button>
                    <Button onClick={handleSubmit} type="submit" color="success">Valider</Button>
                  </Button.Group>
                </Section>
              </Modal.Content>
            </Modal>
          </form>
        </Container>
      </Columns.Column>
    </>
  );
};

// == Export
export default ProfileEdit;
