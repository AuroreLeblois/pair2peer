import React, { useState, useEffect } from 'react';
import { Columns, Form, Button, Box, Container, Content, Heading, Notification } from 'react-bulma-components';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from 'src/store/actions';
import { API_URI } from 'src/store/utils';
import axios from 'axios';

const Contact = () => {
  const { usersData, loading, errors } = useSelector((state) => state)
  console.log(usersData);

  const [mail, setMail] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [users, setUsers] = useState();
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newMessage = {
      name,
      mail,
      message,
    };

    axios.post(`${API_URI}`)
    .then((res) => {
      if (res.data.status === 'success'){
        alert("Message Envoyer."); 
        this.resetForm()
      }else if(res.data.status === 'fail'){
        alert("Réésayer.")
      }
    });

    dispatch({ type: actions.SET_LOADER });
  };

const getUsersData = () => {
  axios.get(`${API_URI}/contact`)
  .then((res) => {
    setUsers(res.data);
    dispatch({ type: actions.CLEAR_ERRORS_MSG });
    console.log(res.data);
  })
  .catch((err) => {
    // Au cas où erreur avec le serveur, renvoie un console.log
    console.log(err);
  });
};

  useEffect(getUsersData, []);
  
// const usersMail = ({ userData }) => {
//   console.log(userData)
//   if (user) {
//     return (
//       <div class="form-group">
//         <div class="col-sm-10" style={{ textAlign: 'center' }}>
//           <input type="email" name="email" id="email" class="form-control" value={user.mail}/>
//         </div>
//       </div>
//     );
//   }
//     return null;
//   };
  
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
          {(errors) ? <ErrorsMessage /> : null}
          <form onSubmit={handleSubmit}>
            <Form.Field>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Mail :</Form.Label>
                  <Form.Input required type="email" name="email" id="email" class="input is-primary" value={mail} onChange={(e) => setMail(e.target.value)}/>
                </Form.Control>
              </Form.Field>

              <Form.Field>
                <Form.Control>
                  <Form.Label>To :</Form.Label>
                  <Form.Input required type="email" name="destination" id="destination" class="input is-primary" value="pair2peer@gmail.com" placeholder="pair2peer@gmail.com" />
                </Form.Control>
              </Form.Field>
            </Form.Field>

            <Form.Field>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Message :</Form.Label>
                  <div class="field">
                    <div class="control">
                      <textarea required class="textarea is-primary" placeholder="Votre message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    </div>
                  </div>
                </Form.Control>
              </Form.Field>
            </Form.Field>
            

            <Columns.Column />
            <Button loading={loading} style={{ margin: "10px 180px" }} type="submit" color="success">Envoyer</Button>
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
