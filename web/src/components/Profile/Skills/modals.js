// == Import npm
import React from 'react';
import { useSelector } from 'react-redux';
import { firstLetterToUppercase } from 'src/store/utils';
import { Form, Heading, Columns, Button, Modal, Section } from 'react-bulma-components';
import useInputChange from 'src/store/hooks/useInputChange';


const Modals = ({ modalIt, modalLang, editIt, itClicked, setModalIt, setModalLang, setEditIt, setItClicked }) => {
  const { filters, user } = useSelector((state) => state);

  const [input, handleInputChange] = useInputChange();

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

  const ModalAddIT = () => (
    <Modal closeOnBlur show={modalIt} onClose={() => setModalIt(false)}>
      <Modal.Content>
        <Section style={{ backgroundColor: 'white' }}>
          <Heading renderAs="p" size={5}>Ajouter une compétence</Heading>
          <form>
            <Form.Field>
              <Form.Field.Body>
                <Form.Field>
                  <Form.Control>
                    <Form.Label>Technologie</Form.Label>
                    <Form.Select onChange={handleInputChange} value={input.it_language} name="it_language">
                      <option value="">{null}</option>
                      <ItOptions />
                    </Form.Select>
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Control>
                    <Form.Label>Niveau</Form.Label>
                    <Form.Select onChange={handleInputChange} value={input.level} name="level">
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
          </form>
        </Section>
      </Modal.Content>
    </Modal>
  );

  const ModalEditIT = () => (
    <Modal closeOnBlur show={editIt} onClose={() => setEditIt(false)}>
      <Modal.Content>
        <Section style={{ backgroundColor: 'white' }}>
          <Heading renderAs="p" size={5}>{(itClicked) ? `Editer ${firstLetterToUppercase(itClicked)}` : null }</Heading>
          <form>
            <Columns.Column>
              <Form.Field>
                <Form.Field.Body>
                  <Form.Field>
                    <Form.Control>
                      <Form.Label>Langage</Form.Label>
                      <Form.Input disabled value={(itClicked) ? itClicked : null} name="level" />
                    </Form.Control>
                  </Form.Field>
                  <Form.Field>
                    <Form.Control>
                      <Form.Label>Niveau</Form.Label>
                      <Form.Select onChange={handleInputChange} value={(input.level) ? input.level : goodLevelIt()} name="level">
                        <LvlOptions />
                      </Form.Select>
                    </Form.Control>
                  </Form.Field>
                </Form.Field.Body>
              </Form.Field>
            </Columns.Column>
            <Button.Group position="right">
              <Button onClick={() => setEditIt(false)} color="danger">Annuler</Button>
              <Button type="submit" color="success">Valider</Button>
            </Button.Group>
          </form>
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
      <ModalAddIT />
      <ModalEditIT />
      <ModalAddLang />
    </>
  );
};

export default Modals;
