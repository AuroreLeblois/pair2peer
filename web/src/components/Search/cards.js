import React, { Fragment } from 'react';
import { firstLetterToUppercase } from 'src/store/utils';
import { Card, Media, Content, Heading, Form, Tag, Image, Columns, Hero, Container, Progress } from 'react-bulma-components';

const Cards = ({ users }) => {
  let key = 1;

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
                {user.language.map((language) => (
                  <Tag key={key++}>{firstLetterToUppercase(language)}</Tag>
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
                  <Fragment key={key++}>
                    <Form.Control>
                      <Tag color="dark">{firstLetterToUppercase(label.name)}</Tag>
                    </Form.Control>
                    <Progress color="danger" size="small" value={label.level} max={10} />
                  </Fragment>
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
