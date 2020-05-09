// == Import npm
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Heading, Progress, Columns, Container, Content, Tag, Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { actions, deleteLang } from 'src/store/actions';

// == Import components
import Loading from 'src/components/Loading';
import ModalAddIt from './Modals/modalAddIt';
import ModalAddLang from './Modals/modalAddLang';
import ModalEditIT from './Modals/modalEditIt';

// == Composant
const SkillsEdit = () => {
  const dispatch = useDispatch();
  let key = 1;
  const { user, loading } = useSelector((state) => state);

  // States required for modal info
  const [modalIt, setModalIt] = useState(false);
  const [modalLang, setModalLang] = useState(false);
  const [editIt, setEditIt] = useState(false);
  const [itClicked, setItClicked] = useState();

  const handleEditClick = (evt, value) => {
    setEditIt(true);
    setItClicked(value);
  };

  const handleClickDeleteLang = (evt, value) => {
    console.log(evt);
    console.log(value);
    dispatch(deleteLang(value));
    dispatch({ type: actions.SET_LOADER });
  };

  const handleClickDeleteIt = (evt, value) => {
    console.log(evt);
    console.log(value);
    dispatch(deleteLang(value));
    dispatch({ type: actions.SET_LOADER });
  };

  const ItLanguages = () => {
    if (user.it_language[0].name !== null) {
      return (
        <>
          <Container>
            {user.it_language.map((techno) => (
              <Columns key={key++}>
                <Columns.Column size={2}>
                  <Icon color="danger" renderAs="div">
                    <FontAwesomeIcon renderAs="a" size="lg" icon={faTrash} pull="left" />
                  </Icon>
                  <Icon color="dark" renderAs="a" onClick={(evt) => handleEditClick(evt, techno.name)}>
                    <FontAwesomeIcon size="lg" icon={faEdit} pull="right" />
                  </Icon>
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
                    <Tag size="medium" onClick={(evt) => handleClickDeleteLang(evt, language)} color="danger" remove renderAs="a" />
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

  if (!loading) {
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
  }
  return <Loading />;
};

// == Export
export default SkillsEdit;
