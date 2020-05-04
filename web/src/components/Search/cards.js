import React from 'react';
import { Card, Icon, Image, Label } from 'semantic-ui-react';
import { firstLetterToUppercase } from 'src/store/utils';

const Cards = ({ users }) => {
  if (!users) {
    return null;
  }

  return users.map((user) => (
    <Card fluid color="yellow" key={user.id}>
      <Image src="http://fr.web.img4.acsta.net/r_640_360/newsv7/19/01/27/15/43/1278026.jpg" />
      <Card.Content>
        <Card.Header>{firstLetterToUppercase(user.pseudo)}</Card.Header>
        <Card.Meta>
          <span className="date"><Icon name="map marker" />{firstLetterToUppercase(user.city)}, {firstLetterToUppercase(user.country)}</span>
        </Card.Meta>
        <Card.Description>{user.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Label.Group size="mini">
          {user.it_language.map((label) => (
            <Label key={label.name} size="mini">{label.name}</Label>
          ))}
        </Label.Group>
      </Card.Content>
      <Card.Content extra>
        <Label.Group size="mini">
          {user.language.map((language) => (
            <Label key={language} size="mini">{language}</Label>
          ))}
        </Label.Group>
      </Card.Content>
    </Card>
  ));
};

export default Cards;
