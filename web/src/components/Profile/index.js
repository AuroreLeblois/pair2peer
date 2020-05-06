// == Import npm
import React from 'react';
import { useSelector } from 'react-redux';
import { firstLetterToUppercase } from 'src/store/utils';
import { Columns, Card, Media, Image, Heading, Content } from 'react-bulma-components';

// == Import
import ProfileEdit from './profileEdit';

// == Composant
const Profile = () => {
  const user = useSelector((state) => state.user);
  console.log(user);

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
      <Columns.Column>
        <Image size="128x128" rounded src={user.picture} />
      </Columns.Column>
      <Columns.Column size="three-quarters">
        <ProfileEdit />
      </Columns.Column>
    </Columns>
  );
};

// == Export
export default Profile;
