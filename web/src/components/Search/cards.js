import React, { Fragment } from 'react';
import { firstLetterToUppercase } from 'src/store/utils';
import { Card, Media, Content, Heading, Form, Tag, Image, Columns, Hero, Container, Progress } from 'react-bulma-components';

const Cards = ({ users }) => {
  let key = 1;

  const ItLabels = ({ user }) => {
    if (user.it_language[0].name !== null) {
      return user.it_language.map((label) => (
        <Fragment key={key++}>
          <Form.Control>
            <Tag color="dark">{label.name}</Tag>
          </Form.Control>
          <Progress color="danger" size="small" value={label.level} max={10} />
        </Fragment>
      ));
    }
    return null;
  };

  const LanguagesLabels = ({ user }) => {""
    if (user.language[0] !== null) {
      return user.language.map((language) => (
        <Tag key={key++}>{language}</Tag>
      ));
    }
    return null;
  };

  if (!users) {
    return null;
  }

  return users.map((user) => (
    <Columns.Column key={key++} size={4}>
      <Card>
        <Card.Content>
          <Media>
            <Media.Item renderAs="figure" position="left">
              <Image size={128} src={user.picture} />
            </Media.Item>
            <Media.Content>
              <Hero>
                <Hero.Body>
                  <Container>
                    <Heading renderAs="p" size={4}>{user.pseudo}</Heading>
                    <Heading renderAs="p" subtitle size={6}>{user.city}, {user.country}</Heading>
                  </Container>
                </Hero.Body>
              </Hero>
            </Media.Content>
          </Media>
          <Media>
            <Media.Item>
              <Tag.Group>
                <LanguagesLabels user={user} />
              </Tag.Group>
            </Media.Item>
          </Media>
          <Content>
            {(user.description) ? user.description : null}
          </Content>
          <Media>
            <Media.Item>
              <Form.Field multiline kind="group">
                <ItLabels user={user} />
              </Form.Field>
            </Media.Item>
          </Media>
        </Card.Content>
      </Card>
    </Columns.Column>
  ));
};

export default Cards;
