// == Import npm
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Heading, Progress, Columns, Container, Content, Tag, Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';

// == Import components
import ModalAddIt from './Modals/modalAddIt';
import ModalAddLang from './Modals/modalAddLang';
import ModalEditIT from './Modals/modalEditIt';

// == Composant
const SkillsEdit = () => {
  let key = 1;
  const { user } = useSelector((state) => state);

  // States required for modal info
  const [modalIt, setModalIt] = useState(false);
  const [modalLang, setModalLang] = useState(false);
  const [editIt, setEditIt] = useState(false);
  const [itClicked, setItClicked] = useState();

  console.log(itClicked);

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
      <ModalAddIt modalIt={modalIt} itClicked={itClicked} setModalIt={setModalIt} />
      <ModalEditIT itClicked={itClicked} editIt={editIt} setEditIt={setEditIt} setItClicked={setItClicked} />
      <ModalAddLang modalLang={modalLang} setModalLang={setModalLang} />
    </>
  );
};

// == Export
export default SkillsEdit;
