// == Import npm
import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Heading, Progress, Columns, Container, Content, Tag, Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import Modals from './modals';

// == Composant
const Skills = () => {
  let key = 1;
  const { user, filters } = useSelector((state) => state);

  // States required for modal info
  const [modalIt, setModalIt] = useState(false);
  const [modalLang, setModalLang] = useState(false);
  const [editIt, setEditIt] = useState(false);
  const [itClicked, setItClicked] = useState();

  const handleEditClick = (evt) => {
    setEditIt(true);
    setItClicked(evt.currentTarget.value);
  };

  const ItLanguages = () => {
    if (user.it_language[0].name !== null) {
      return (
        <>
          <Container>
            {user.it_language.map((techno) => (
              <Columns key={key++}>
                <Columns.Column size={1}>
                  <Button size="small" color="danger" onClick={handleEditClick} value={techno.name}>
                    <Icon renderAs="div">
                      <FontAwesomeIcon size="lg" icon={faPenSquare} />
                    </Icon>
                  </Button>
                </Columns.Column>
                <Columns.Column size={2}>
                  <Form.Control>
                    <Form.Label>{techno.name}</Form.Label>
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
    }
    return null;
  };

  const Languages = () => {
    if (user.language[0] !== null) {
      return (
        <Container>
          <Columns>
            {user.language.map((language) => (
              <Columns.Column key={key++} size={2}>
                <Form.Control>
                  <Tag.Group gapless>
                    <Tag size="medium">{language}</Tag>
                    <Tag size="medium" color="danger" remove renderAs="a" />
                  </Tag.Group>
                </Form.Control>
              </Columns.Column>
            ))}
          </Columns>
        </Container>
      );
    }
    return null;
  };

  return (
    <>
      <Columns.Column>
        <Button.Group position="centered">
          <Button renderAs="a" onClick={() => setModalIt(true)} color="danger">Ajouter une compétence</Button>
          <Button renderAs="a" onClick={() => setModalLang(true)} color="danger">Ajouter une langue</Button>
        </Button.Group>
        <Columns.Column />
        <Container>
          <Content style={{ textAlign: 'center' }}>
            <Heading renderAs="p" size={5}>Compétences</Heading>
          </Content>
          <ItLanguages />
          <Columns.Column />
          <Content style={{ textAlign: 'center' }}>
            <Heading renderAs="p" size={5}>Langues</Heading>
          </Content>
          <Languages />
        </Container>
      </Columns.Column>
      <Modals
        modalIt={modalIt}
        modalLang={modalLang}
        editIt={editIt}
        itClicked={itClicked}
        setModalIt={setModalIt}
        setModalLang={setModalLang}
        setEditIt={setEditIt}
        setItClicked={setItClicked}
      />
    </>
  );
};

// == Export
export default Skills;
