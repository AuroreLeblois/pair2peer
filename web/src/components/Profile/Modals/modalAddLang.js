// == Import npm
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { firstLetterToUppercase } from 'src/store/utils';
import { Form, Heading, Button, Modal, Section } from 'react-bulma-components';
import useInputChange from 'src/store/hooks/useInputChange';
import { submitUpdateLang, actions } from 'src/store/actions';


const ModalAddLang = ({ modalLang, setModalLang }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state);

  const [input, handleInputChange] = useInputChange();

  const LangOptions = () => {
    if (filters.language) {
      return filters.language.map((language) => (
        <option key={language} value={language}>{firstLetterToUppercase(language)}</option>
      ));
    }
    return null;
  };

  const handleSubmitAddLang = (evt) => {
    evt.preventDefault();
    dispatch(submitUpdateLang(input));
    dispatch({ type: actions.SET_LOADER });
    setModalLang(false);
  };

  return (
    <Modal closeOnBlur show={modalLang} onClose={() => setModalLang(false)}>
      <Modal.Content>
        <Section style={{ backgroundColor: 'white' }}>
          <Heading renderAs="p" size={5}>Ajouter une langue</Heading>
          <form>
            <Form.Field>
              <Form.Control>
                <Form.Label>Langue</Form.Label>
                <Form.Select onChange={handleInputChange} value={input.language} name="language">
                  <option value=""> -- Selectionner une option -- </option>
                  <LangOptions />
                </Form.Select>
              </Form.Control>
            </Form.Field>
            <Button.Group position="right">
              <Button type="button" onClick={() => setModalLang(false)} color="danger">Annuler</Button>
              <Button onClick={handleSubmitAddLang} type="submit" color="success">Valider</Button>
            </Button.Group>
          </form>
        </Section>
      </Modal.Content>
    </Modal>
  );
};

export default ModalAddLang;
