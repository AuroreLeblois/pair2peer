// == Import npm
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInputChange from 'src/store/hooks/useInputChange';
import { Form, Heading, Button, Modal, Section, Columns } from 'react-bulma-components';
import { submitUpdateIt, actions } from 'src/store/actions';

const ModalEditIT = ({ itClicked, setItClicked, editIt, setEditIt }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state);

  const [input, handleInputChange] = useInputChange();

  const goodLevelIt = () => {
    let goodLanguage;
    if (itClicked) {
      goodLanguage = user.it_language.find((language) => language.name === itClicked);
      return goodLanguage.level;
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

  const closeModal = () => {
    setEditIt(false);
    setItClicked();
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = {};
    input.name = itClicked;
    input.search = true;
    data.it_language = [input];
    dispatch(submitUpdateIt(data));
    dispatch({ type: actions.SET_LOADER });
    setEditIt(false);
  };

  return (
    <Modal closeOnBlur show={editIt} onClose={closeModal}>
      <Modal.Content>
        <Section style={{ backgroundColor: 'white' }}>
          <Heading renderAs="p" size={5}>{(itClicked) ? `Editer ${itClicked}` : null }</Heading>
          <form onSubmit={handleSubmit}>
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
              <Button type="button" onClick={closeModal} color="danger">Annuler</Button>
              <Button type="submit" color="success">Valider</Button>
            </Button.Group>
          </form>
        </Section>
      </Modal.Content>
    </Modal>
  );
};

export default ModalEditIT;
