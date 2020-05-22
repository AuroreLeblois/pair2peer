import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Columns, Form, Button, Box, Container, Content, Heading, Notification } from 'react-bulma-components';
import { submitContact, actions } from 'src/store/actions';

const Contact = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { usersData, loading, errors } = useSelector((state) => state);
  console.log(usersData);

  // Les hooks

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newMessage = {
      name,
      email,
      message,
    };
    dispatch(submitContact(history, newMessage));
    dispatch({ type: actions.SET_LOADER });
    
  };
  
  // const ErrorsMessage = () => {
  //   return (
  //     <Notification color="danger">
  //       {Object.keys(errors).map((objectKey, index) => (
  //         <p>{errors[objectKey]}</p>
  //       ))}
  //     </Notification>
  //   );
  // };
	return (
    <Columns>
      <Columns.Column />
      <Columns.Column>
        <Columns>
          <Container>
            <Content style={{ textAlign: 'center' }}>
              <Heading size={3}>Nous contacter</Heading>
            </Content>
          </Container>
        </Columns>
        <Columns.Column />
        <Box style={{ width: "500px" }}>
        {/* {(errors) ? <ErrorsMessage /> : null} */}
          <form onSubmit={handleSubmit}>
            <Form.Field>
            <Form.Field>
                <Form.Control>
                  <Form.Label>Nom :</Form.Label>
                  <Form.Input required type="text" className="input is-primary" value={name} onChange={(e) => setName(e.target.value)}/>
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Mail :</Form.Label>
                  <Form.Input required type="email" className="input is-primary" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Control>
              </Form.Field>
            </Form.Field>
            <Form.Field>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Message :</Form.Label>
                  <div className="field">
                    <div className="control">
                      <textarea required className="textarea is-primary" placeholder="Votre message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    </div>
                  </div>
                </Form.Control>
              </Form.Field>
            </Form.Field>
            <Columns.Column />
            <Button style={{ margin: "10px 180px" }} type="submit" color="success">Envoyer</Button>
            <Columns.Column />
          </form>
          <Columns.Column />
          <Columns.Column />
        </Box>
      </Columns.Column>
      <Columns.Column />
    </Columns>
	);
};
export default Contact;
