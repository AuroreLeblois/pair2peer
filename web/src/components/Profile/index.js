// == Import npm
import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Icon, Image, Grid, Container, Label } from 'semantic-ui-react';
import { firstLetterToUppercase } from 'src/store/utils';

// == Import
import ProfileEdit from './profileEdit';

// == Composant
const Profile = () => {
  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    <Grid centered>
      <Grid.Column width={3}>
        <Image src={user.picture} circular size="medium" />
        <Card>
          <Card.Content>
            <Card.Header>{firstLetterToUppercase(user.pseudo)}</Card.Header>
            <Card.Meta>
              <Icon name="map marker" /> {firstLetterToUppercase(user.city)}, {firstLetterToUppercase(user.country)}
            </Card.Meta>
          </Card.Content>
          <Card.Content extra centered>
            <Label.Group size="mini" centered>
              {user.it_language.map((label) => (
                <Label key={label.name} size="mini" centered>{label.name}</Label>
              ))}
            </Label.Group>
          </Card.Content>
        </Card>
      </Grid.Column>
      <Grid.Column width={8}>
        <ProfileEdit />
      </Grid.Column>
    </Grid>
  );
};

// == Export
export default Profile;
