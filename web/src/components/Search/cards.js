import React from 'react';
import { firstLetterToUppercase } from 'src/store/utils';
import { Card, Media, Content, Heading, Form, Tag, Image, Columns, Hero, Container } from 'react-bulma-components';

const Cards = ({ users }) => {
  if (!users) {
    return null;
  }

  return users.map((user) => (
    <Columns.Column key={user.pseudo} size={4}>
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
                {user.language.map((language) => (
                  <Tag key={language}>{firstLetterToUppercase(language)}</Tag>
                ))}
              </Tag.Group>
            </Media.Item>
          </Media>
          <Content>
            {user.description}
          </Content>
          <Media>
            <Media.Item>
              <Form.Field multiline kind="group">
                {user.it_language.map((label) => (
                  <Form.Control key={label.name}>
                    <Tag.Group gapless>
                      <Tag color="dark">{firstLetterToUppercase(label.name)}</Tag>
                      <Tag color="info">{label.level}</Tag>
                    </Tag.Group>
                  </Form.Control>
                ))}
              </Form.Field>
            </Media.Item>
          </Media>
        </Card.Content>
      </Card>
    </Columns.Column>
  ));
};

export default Cards;
