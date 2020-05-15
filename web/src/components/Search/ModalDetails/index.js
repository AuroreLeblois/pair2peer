/* eslint-disable react/jsx-filename-extension */
// == Import npm
import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Content, Modal, Media, Image, Level, Button, Container, Tag, Heading, Icon, Progress, Columns } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faColumns } from '@fortawesome/free-solid-svg-icons';

// == Composant
const UserProfile = ({ modalUserDetails, setModalUserDetails }) => {
  const { selectedUser } = useSelector((state) => state);
  let key = 1;
  console.log(selectedUser)

  const ItLabels = () => {
    if (selectedUser.it_language[0].name !== null) {
      return selectedUser.it_language.map((label) => (
        <Fragment key={key++}>
          <Columns vCentered>
            <Columns.Column size={2}>
              <Tag size="medium" color="dark">{label.name}</Tag>
            </Columns.Column>
            <Columns.Column>
              <Progress color="danger" value={label.level} max={10} />
            </Columns.Column>
          </Columns>
        </Fragment>
      ));
    }
    return null;
  };

  const LanguagesLabels = () => {
    if (selectedUser.language[0] !== null) {
      return selectedUser.language.map((language) => (
        <Tag size="medium" key={key++}>{language}</Tag>
      ));
    }
    return null;
  };

  const LinkedinIcon = () => (
    <Icon className="about-icons" color="dark">
      <FontAwesomeIcon size="lg" icon={faLinkedin} />
    </Icon>
  );

  const GithubIcon = () => (
    <Icon className="about-icons" color="dark">
      <FontAwesomeIcon size="lg" icon={faGithub} />
    </Icon>
  );

  const FacebookIcon = () => (
    <Icon className="about-icons" color="dark">
      <FontAwesomeIcon size="lg" icon={faFacebook} />
    </Icon>
  );

  if (selectedUser) {
    return (
      <Modal closeOnBlur show={modalUserDetails} onClose={() => setModalUserDetails(false)}>
        <Modal.Card>
          <Modal.Card.Head onClose={() => setModalUserDetails(false)}>
            <Modal.Card.Title>{selectedUser.pseudo}</Modal.Card.Title>
          </Modal.Card.Head>
          <Modal.Card.Body>
            <Media>
              <Media.Item renderAs="figure" position="left">
                <Image size={128} alt={`${selectedUser.pseudo}-picture`} src={selectedUser.picture} />
              </Media.Item>
              <Media.Item>
                <Content>
                  <Heading size={5}>{selectedUser.pseudo}</Heading>
                  <Heading renderAs="p" size={6} subtitle>{selectedUser.city}, {selectedUser.country}</Heading>
                  <p>{selectedUser.description}</p>
                </Content>
              </Media.Item>
            </Media>
            <Media>
              <Media.Item>
                <Heading subtitle size={6}>Langages de programmation</Heading>
                <Tag.Group>
                  <Container>
                    <ItLabels />
                  </Container>
                </Tag.Group>
              </Media.Item>
            </Media>
            <Media>
              <Media.Item>
                <Heading subtitle size={6}>Langues</Heading>
                <Tag.Group>
                  <LanguagesLabels />
                </Tag.Group>
              </Media.Item>
            </Media>
            <Media>
              <Media.Item>
                {(selectedUser.github_link !== '') ? <GithubIcon /> : null}
                {(selectedUser.linkedin_link !== '') ? <LinkedinIcon /> : null}
                {(selectedUser.facebook_link !== '') ? <FacebookIcon /> : null}
              </Media.Item>
            </Media>
          </Modal.Card.Body>
          <Modal.Card.Foot style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Button color="success">Contacter {selectedUser.pseudo}</Button>
          </Modal.Card.Foot>
        </Modal.Card>
      </Modal>
    );
  }
  return null;
};

// == Export
export default UserProfile;
