import React from 'react';
import { Card, Icon, Image, Label } from 'semantic-ui-react';
import { firstLetterToUppercase } from 'src/store/utils';

const Cards = ({ users }) => {
  if (!users) {
    return null;
  }

  return users.map((user) => (
    <Card color="yellow" key={user.id}>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src={user.picture}
        />
        <Card.Header>{firstLetterToUppercase(user.pseudo)}</Card.Header>
        <Card.Meta>
          <span className="date"><Icon name="map marker" />{firstLetterToUppercase(user.city)}, {firstLetterToUppercase(user.country)}</span>
        </Card.Meta>
        <Card.Description>{user.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Label.Group size="mini">
          {user.it_language.map((label) => (
            <Label size="mini">{label.name}</Label>
          ))}
        </Label.Group>
      </Card.Content>
    </Card>
  ));
};

export default Cards;
