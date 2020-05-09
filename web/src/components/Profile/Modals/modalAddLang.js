// == Import npm
import React from 'react';
import { useSelector } from 'react-redux';
import { firstLetterToUppercase } from 'src/store/utils';
import { Form, Heading, Button, Modal, Section } from 'react-bulma-components';
import useInputChange from 'src/store/hooks/useInputChange';


const ModalAddLang = ({ modalLang, setModalLang }) => {
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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(input.language);
  };

  return (
    <Modal closeOnBlur show={modalLang} onClose={() => setModalLang(false)}>
      <Modal.Content>
        <Section style={{ backgroundColor: 'white' }}>
          <Heading renderAs="p" size={5}>Ajouter une langue</Heading>
          <form onSubmit={handleSubmit}>
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
              <Button type="button" onClick={() => setModalLang(false)} color="danger">Annuler</Button>
              <Button type="submit" color="success">Valider</Button>
            </Button.Group>
          </form>
        </Section>
      </Modal.Content>
    </Modal>
  );
};

export default ModalAddLang;
