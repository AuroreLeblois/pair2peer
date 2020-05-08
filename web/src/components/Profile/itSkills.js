// == Import npm
import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Heading, Progress, Columns, Container, Content, Tag, Button, Modal, Section, Icon } from 'react-bulma-components';
import { firstLetterToUppercase } from 'src/store/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';

// == Composant
const ITSkills = () => {
  let key = 1;
  const { user, filters } = useSelector((state) => state);

  // States required for modal info
  const [modalIt, setModalIt] = useState(false);
  const [modalLang, setModalLang] = useState(false);
  const [editIt, setEditIt] = useState(false);
  const [itClicked, setItClicked] = useState();

  // States for update request Languages & IT Languages
  const [input, setInput] = useState({
    language: user.language,
    it_language: user.it_language,
  });

  const handleInputChange = (evt) => setInput({
    ...evt.currentTarget.name,
    [evt.currentTarget.name]: evt.currentTarget.value,
  });

  console.log(input)

  const LangOptions = () => {
    if (filters.language) {
      return filters.language.map((language) => (
        <option key={language} value={language}>{firstLetterToUppercase(language)}</option>
      ));
    }
    return null;
  };

  const ItOptions = () => {
    if (filters.it_language) {
      return filters.it_language.map((language) => (
        <option key={language} value={language}>{firstLetterToUppercase(language)}</option>
      ));
    }
    return null;
  };

  const LvlOptions = () => {
    return (
      <>
        <option key="1" value="">{null}</option>
        <option key="2" value="1">1</option>
        <option key="3" value="2">2</option>
        <option key="4" value="3">3</option>
        <option key="5" value="4">4</option>
        <option key="6" value="5">5</option>
        <option key="7" value="6">6</option>
        <option key="8" value="7">7</option>
        <option key="9" value="8">8</option>
        <option key="10" value="9">9</option>
        <option key="11" value="10">10</option>
      </>
    );
  };

  const goodLevelIt = () => {
    let goodLanguage;
    if (itClicked) {
      goodLanguage = user.it_language.find((language) => language.name === itClicked);
      return goodLanguage.level;
    }
    return null;
  };

  const handleEditClick = (evt) => {
    setEditIt(true);
    setItClicked(evt.currentTarget.value);
  };

  const ItLanguages = () => {
    if (user.it_language) {
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
    }
    return null;
  };

  const Languages = () => {
    if (user.language) {
      return (
        <Container>
          <Columns>
            {user.language.map((language) => (
              <Columns.Column key={key++} size={2}>
                <Form.Control>
                  <Tag.Group gapless>
                    <Tag size="medium">{firstLetterToUppercase(language)}</Tag>
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

  const ModalAddIT = () => (
    <Modal closeOnBlur show={modalIt} onClose={() => setModalIt(false)}>
      <Modal.Content>
        <Section style={{ backgroundColor: 'white' }}>
          <Heading renderAs="p" size={5}>Ajouter une compétence</Heading>
          <Form.Field>
            <Form.Field.Body>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Technologie</Form.Label>
                  <Form.Select name="it_language">
                    <option value="">{null}</option>
                    <ItOptions />
                  </Form.Select>
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Niveau</Form.Label>
                  <Form.Select name="level">
                    <LvlOptions />
                  </Form.Select>
                </Form.Control>
              </Form.Field>
            </Form.Field.Body>
          </Form.Field>
          <Button.Group position="right">
            <Button onClick={() => setModalIt(false)} color="danger">Annuler</Button>
            <Button type="submit" color="success">Valider</Button>
          </Button.Group>
        </Section>
      </Modal.Content>
    </Modal>
  );

  const ModalEditIT = () => (
    <Modal closeOnBlur show={editIt} onClose={() => setEditIt(false)}>
      <Modal.Content>
        <Section style={{ backgroundColor: 'white' }}>
          <Heading renderAs="p" size={5}>{(itClicked) ? `Editer ${firstLetterToUppercase(itClicked)}` : null }</Heading>
          <Columns.Column>
            <Form.Field>
              <Form.Control>
                <Form.Label>Niveau</Form.Label>
                <Form.Select value={goodLevelIt()} name="level">
                  <LvlOptions />
                </Form.Select>
              </Form.Control>
            </Form.Field>
          </Columns.Column>
          <Button.Group position="right">
            <Button onClick={() => setEditIt(false)} color="danger">Annuler</Button>
            <Button type="submit" color="success">Valider</Button>
          </Button.Group>
        </Section>
      </Modal.Content>
    </Modal>
  );

  const ModalAddLang = () => (
    <Modal closeOnBlur show={modalLang} onClose={() => setModalLang(false)}>
      <Modal.Content>
        <Section style={{ backgroundColor: 'white' }}>
          <Heading renderAs="p" size={5}>Ajouter une langue</Heading>
          <Form.Field>
            <Form.Control>
              <Form.Label>Langue</Form.Label>
              <Form.Select onChange={handleInputChange} value={input.language} name="language">
                <option value="">{null}</option>
                <LangOptions />
              </Form.Select>
            </Form.Control>
          </Form.Field>
          <Button.Group position="right">
            <Button onClick={() => setModalLang(false)} color="danger">Annuler</Button>
            <Button type="submit" color="success">Valider</Button>
          </Button.Group>
        </Section>
      </Modal.Content>
    </Modal>
  );

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
      <ModalAddIT />
      <ModalAddLang />
      <ModalEditIT />
    </>
  );
};

// == Export
export default ITSkills;
