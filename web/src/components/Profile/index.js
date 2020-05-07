// == Import npm
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { firstLetterToUppercase } from 'src/store/utils';
import { Columns, Image, Media, Container, Heading, Hero, Form, Button, Box } from 'react-bulma-components';

// == Import
import ProfileEdit from './profileEdit';

// == Composant
const Profile = () => {
  const [activeTab, setActiveTab] = useState();
  const user = useSelector((state) => state.user);

  return (
    // <Grid relaxed="very" centered>
    //   <Grid.Column width={4}>
    //     <Image src={user.picture} circular size="large" centered />
    //     <Card>
    //       <Card.Content>
    //         <Card.Header>{firstLetterToUppercase(user.pseudo)}</Card.Header>
    //         <Card.Meta>
    //           <Icon name="map marker" /> {firstLetterToUppercase(user.city)}, {firstLetterToUppercase(user.country)}
    //         </Card.Meta>
    //       </Card.Content>
    //       <Card.Content extra>
    //         <Label.Group size="mini">
    //           {user.it_language.map((label) => (
    //             <Label key={label.name} size="mini">{label.name}</Label>
    //           ))}
    //         </Label.Group>
    //       </Card.Content>
    //     </Card>
    //   </Grid.Column>
    //   <Grid.Column width={10}>
    //     <ProfileEdit />
    //   </Grid.Column>
    // </Grid>
    <Columns>
      <Columns.Column />

      <Columns.Column size={3}>
        <Columns.Column style={{ textAlign: 'center' }}>
          <Heading renderAs="p" size={4}>Profil Utilisateur</Heading>
        </Columns.Column>
        <Columns.Column>
          <Button isStatic={!activeTab} color="info" fullwidth onClick={() => setActiveTab(!activeTab)}>Général</Button>
        </Columns.Column>
        <Columns.Column>
          <Button isStatic={activeTab} color="info" fullwidth onClick={() => setActiveTab(!activeTab)}>Avancé</Button>
        </Columns.Column>
      </Columns.Column>

      <Columns.Column size={8}>
        <Box>
          <Columns.Column>
            <Container className="picture-profile">
              <Media>
                <Media.Item renderAs="figure" position="left">
                  <Image size={128} rounded src={user.picture} />
                </Media.Item>
                <Media.Content>
                  <Hero>
                    <Hero.Body>
                      <Container>
                        <Heading renderAs="p" size={5}>{firstLetterToUppercase(user.pseudo)}</Heading>
                        <Heading renderAs="p" subtitle size={6}>{firstLetterToUppercase(user.city)}, {firstLetterToUppercase(user.country)}</Heading>
                      </Container>
                    </Hero.Body>
                  </Hero>
                </Media.Content>
              </Media>
            </Container>
          </Columns.Column>
          <Columns.Column />
          <ProfileEdit />
        </Box>
      </Columns.Column>


      <Columns.Column />
    </Columns>
  );
};

// == Export
export default Profile;
