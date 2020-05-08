// == Import npm
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Form, Heading, Progress, Columns, Container, Content, Tag, Button } from 'react-bulma-components';
import { firstLetterToUppercase } from 'src/store/utils';

// == Composant
const ITSkills = () => {
  let key = 1;
  const user = useSelector((state) => state.user);

  const lvlOptions = [
    { key: '1', text: '1', value: '1' },
    { key: '2', text: '2', value: '2' },
    { key: '3', text: '3', value: '3' },
    { key: '4', text: '4', value: '4' },
    { key: '5', text: '5', value: '5' },
    { key: '6', text: '6', value: '6' },
    { key: '7', text: '7', value: '7' },
    { key: '8', text: '8', value: '8' },
    { key: '9', text: '9', value: '9' },
    { key: '10', text: '10', value: '10' },
  ];

  const ITButton = () => (
    <>
      <Container>
        {user.it_language.map((techno) => (
          <Columns>
            <Columns.Column size={2}>
              <Form.Control>
                <Form.Label>{firstLetterToUppercase(techno.name)}</Form.Label>
              </Form.Control>
            </Columns.Column>
            <Columns.Column>
              <Progress color="danger" value={techno.level} max={10} />
            </Columns.Column>
          </Columns>
        ))}
      </Container>
    </>
  );

  const Languages = () => (
    <Container>
      {user.language.map((language) => (
        <Columns>
          <Columns.Column size={2}>
            <Form.Control>
              <Tag size="large">{firstLetterToUppercase(language)}</Tag>
            </Form.Control>
          </Columns.Column>
        </Columns>
      ))}
    </Container>
  );

  // const ModalIT = () => (

  // );

  // const ModalLang = () => (

  // );

  return (
    <Columns.Column>
      <Button.Group position="right">
        <Button color="danger">Editer les compétences</Button>
        <Button color="danger">Editer les langues</Button>
      </Button.Group>
      <Columns.Column />
      <Container>
        <Content style={{ textAlign: 'center' }}>
          <Heading renderAs="p" size={5}>Compétences</Heading>
        </Content>
        {(user.it_language) ? <ITButton /> : null }
        <Columns.Column />
        <Content style={{ textAlign: 'center' }}>
          <Heading renderAs="p" size={5}>Langues</Heading>
        </Content>
        {(user.language) ? <Languages /> : null }
      </Container>
    </Columns.Column>
  );
};

// == Export
export default ITSkills;
