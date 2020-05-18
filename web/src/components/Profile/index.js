/* eslint-disable react/jsx-filename-extension */
// == Import npm
import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { firstLetterToUppercase } from 'src/store/utils';
import { Columns, Image, Media, Container, Heading, Hero, Icon, Button, Box } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

// == Import
import Loading from 'src/components/Loading';
import ProfileEdit from './profileEdit';
import SkillsEdit from './skillsEdit';

// == Composant
const Profile = () => {
  const inputFile = useRef(null);
  const [activeTab, setActiveTab] = useState();
  const user = useSelector((state) => state.user);

  const handleClickPictureUpload = () => {
    console.log('pouet');
    inputFile.current.click();
  };

  if (user) {
    return (
      <Columns>
        <Columns.Column />

        <Columns.Column size={3}>
          <Columns.Column style={{ textAlign: 'center' }}>
            <Heading renderAs="p" size={4}>Profil Utilisateur</Heading>
          </Columns.Column>
          <Columns.Column>
            <Button isStatic={!activeTab} color="danger" fullwidth onClick={() => setActiveTab(!activeTab)}>Général</Button>
          </Columns.Column>
          <Columns.Column>
            <Button isStatic={activeTab} color="danger" fullwidth onClick={() => setActiveTab(!activeTab)}>Avancé</Button>
          </Columns.Column>
        </Columns.Column>

        <Columns.Column size={8}>
          <Box>
            <Columns.Column>
              <Container className="picture-profile">
                <Media>
                  <Media.Item onClick={handleClickPictureUpload} renderAs="a" position="left">
                    <Image size={128} rounded src={user.picture} />
                    <Icon pull="right" color="danger">
                      <FontAwesomeIcon className="edit-picture" size="lg" icon={faEdit} />
                    </Icon>
                  </Media.Item>
                  <Media.Content>
                    <Hero>
                      <Hero.Body>
                        <Container>
                          <Heading renderAs="p" size={5}>{user.pseudo}</Heading>
                          <Heading renderAs="p" subtitle size={6}>{user.city}, {user.country}</Heading>
                        </Container>
                      </Hero.Body>
                    </Hero>
                  </Media.Content>
                </Media>
              </Container>
            </Columns.Column>
            <Columns.Column />
            {(activeTab) ? <SkillsEdit /> : <ProfileEdit handleClickPictureUpload={handleClickPictureUpload} inputFile={inputFile} /> }
          </Box>
        </Columns.Column>

        <Columns.Column />
      </Columns>
    );
  }
  return <Loading />;
};

// == Export
export default Profile;
