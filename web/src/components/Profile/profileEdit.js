// == Import npm
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { firstLetterToUppercase } from 'src/store/utils';
import { Columns, Container, Heading, Form, Button, Modal, Section, Icon } from 'react-bulma-components';
import { actions, updateUser } from 'src/store/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

// == Composant
const ProfileEdit = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const [openModal, setOpenModal] = useState(false);
  const [userInfos, setUserInfos] = useState({
    pseudo: user.pseudo,
    email: '',
    validateEmail: '',
    password: '',
    validatePassword: '',
    city: user.city,
    country: user.country,
    remote: user.remote,
    description: (user.description) ? user.description : '',
    disponibility: (user.disponibility) ? user.disponibility : '',
    linkedinLink: (user.linkedinLink) ? user.linkedinLink : '',
    facebook_link: (user.facebook_link) ? user.facebook_link : '',
    github_link: (user.github_link) ? user.github_link : '',
    searchable: true,
  });

  const handleChange = ({ target }) => {
    setUserInfos({ ...userInfos, [target.name]: target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    userInfos.remote = userInfos.remote === 'true' ? true : false;
    if (userInfos.disponibility) {
      userInfos.disponibility = parseInt(userInfos.disponibility, 10);
    }
    console.log(userInfos);
    dispatch(updateUser(userInfos));
    dispatch({ type: actions.SET_LOADER });
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
                  <Form.Label>Pseudo</Form.Label>
                  <Form.Control>
                    <Form.Input value={userInfos.pseudo} name="pseudo" onChange={handleChange} />
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Label>Email</Form.Label>
                  <Form.Control>
                    <Form.Input disabled value={user.email} name="email" type="email" />
                  </Form.Control>
                </Form.Field>
              </Form.Field.Body>
            </Form.Field>
            <Form.Field>
              <Form.Field.Body>
                <Form.Field>
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control>
                    <Form.Input value={userInfos.password} name="password" type="password" onChange={handleChange} />
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Label>Confirmer le mot de passe</Form.Label>
                  <Form.Control>
                    <Form.Input value={userInfos.passwordConfirm} name="validatePassword" type="password" onChange={handleChange} />
                  </Form.Control>
                </Form.Field>
              </Form.Field.Body>
            </Form.Field>

            <Form.Field>
              <Form.Field.Body>
                <Form.Field>
                  <Form.Label>Ville</Form.Label>
                  <Form.Control>
                    <Form.Input value={firstLetterToUppercase(userInfos.city)} name="city" type="text" onChange={handleChange} />
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Label>Pays</Form.Label>
                  <Form.Control>
                    <Form.Input value={firstLetterToUppercase(userInfos.country)} name="country" type="text" onChange={handleChange} />
                  </Form.Control>
                </Form.Field>
              </Form.Field.Body>
            </Form.Field>
            <Form.Field>
              <Form.Label>Combien de temps êtes-vous disponible pour travailler ? (par semaine)</Form.Label>
              <Form.Control>
                <Form.Radio onChange={handleChange} checked={userInfos.disponibility === '5'} value="5" name="disponibility">
                  5h
                </Form.Radio>
                <Form.Radio onChange={handleChange} checked={userInfos.disponibility === '10'} value="10" name="disponibility">
                  10h
                </Form.Radio>
                <Form.Radio onChange={handleChange} checked={userInfos.disponibility === '20'} value="20" name="disponibility">
                  Plus de 20h
                </Form.Radio>
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Comment souhaitez-vous travailler ?</Form.Label>
              <Form.Control>
                <Form.Radio onChange={handleChange} checked={userInfos.remote === true || userInfos.remote === 'true'} value="true" name="remote">
                  Remote
                </Form.Radio>
                <Form.Radio onChange={handleChange} checked={userInfos.remote === false || userInfos.remote === 'false'} value="false" name="remote">
                  Rencontre
                </Form.Radio>
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Description</Form.Label>
              <Form.Control>
                <Form.Textarea placeholder="Présentez-vous ..." value={userInfos.description} name="description" />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Profil GitHub</Form.Label>
              <Form.Control iconLeft>
                <Form.Input value={userInfos.github_link} name="github_link" type="text" onChange={handleChange} />
                <Icon align="left" color="dark">
                  <FontAwesomeIcon size="lg" icon={faGithub} />
                </Icon>
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Profil LinkedIn</Form.Label>
              <Form.Control iconLeft>
                <Form.Input value={userInfos.linkedinLink} name="linkedinLink" type="text" onChange={handleChange} />
                <Icon align="left" color="dark">
                  <FontAwesomeIcon size="lg" icon={faLinkedin} />
                </Icon>
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Profil Facebook</Form.Label>
              <Form.Control iconLeft>
                <Form.Input value={userInfos.facebook_link} name="facebook_link" type="text" onChange={handleChange} />
                <Icon align="left" color="dark">
                  <FontAwesomeIcon size="lg" icon={faFacebook} />
                </Icon>
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
