// == Import npm
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInputChange from 'src/store/hooks/useInputChange';
import { Form, Heading, Button, Modal, Section, Columns } from 'react-bulma-components';
import { submitUpdateIt, actions } from 'src/store/actions';


const ModalAddIt = ({ modalIt, itClicked, setModalIt }) => {
  const dispatch = useDispatch();

  const { user, filters } = useSelector((state) => state);

  const [input, handleInputChange] = useInputChange();

  const goodLevelIt = () => {
    let goodLanguage;
    if (itClicked) {
      goodLanguage = user.it_language.find((language) => language.name === itClicked);
      return goodLanguage.level;
    }
    return '';
  };

  const ItOptions = () => {
    if (filters.it_language) {
      return filters.it_language.map((language) => (
        <option key={language} value={language}>{language}</option>
      ));
    }
    return '';
  };

  const LvlOptions = () => {
    return (
      <>
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

  const handleSubmitAddIt = (evt) => {
    evt.preventDefault();
    const data = {};
    input.search = true;
    data.it_language = [input];
    dispatch(submitUpdateIt(data));
    dispatch({ type: actions.SET_LOADER });
    setModalIt(false);
  };

  return (
    <Modal closeOnBlur show={modalIt} onClose={() => setModalIt(false)}>
      <Modal.Content>
        <Section style={{ backgroundColor: 'white' }}>
          <Heading renderAs="p" size={5}>Ajouter une compétence</Heading>
          <form>
            <Columns.Column>
              <Form.Field>
                <Form.Field.Body>
                  <Form.Field>
                    <Form.Control>
                      <Form.Label>Language</Form.Label>
                      <Form.Select required onChange={handleInputChange} value={(input.name) ? input.name : ''} name="name">
                        <option value=""> -- Selectionner une option -- </option>
                        <ItOptions />
                      </Form.Select>
                    </Form.Control>
                  </Form.Field>
                  <Form.Field>
                    <Form.Control>
                      <Form.Label>Niveau</Form.Label>
                      <Form.Select required onChange={handleInputChange} value={(input.level) ? input.level : goodLevelIt()} name="level">
                        <option value=""> -- Selectionner une option -- </option>
                        <LvlOptions />
                      </Form.Select>
                    </Form.Control>
                  </Form.Field>
                </Form.Field.Body>
              </Form.Field>
            </Columns.Column>
            <Button.Group position="right">
              <Button type="button" onClick={() => setModalIt(false)} color="danger">Annuler</Button>
              <Button onClick={handleSubmitAddIt} color="success">Valider</Button>
            </Button.Group>
          </form>
        </Section>
      </Modal.Content>
    </Modal>
  );
};

export default ModalAddIt;
