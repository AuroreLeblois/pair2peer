/* eslint-disable react/jsx-filename-extension */
// == Import npm
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Columns, Media, Image, Container, Button, Hero, Heading, Form, Box } from 'react-bulma-components';
import useInputChange from 'src/store/hooks/useInputChange';
import { submitMessage, actions } from 'src/store/actions';
import AutoScroll from '@brianmcallister/react-auto-scroll';
import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';

// == Import css
import './style.scss';

const Messages = ({ refreshInbox, selectedChat }) => {
  Moment.globalMoment = moment;
  Moment.globalLocale = 'fr';
  Moment.globalFormat = 'D MMM YYYY | HH:mm';
  Moment.globalLocal = true;


  const dispatch = useDispatch();

  let key = 1;
  const { inbox, user, loading } = useSelector((state) => state);
  const [input, handleInputChange] = useInputChange();

  const goodChat = inbox.filter((chatroom) => chatroom.chat_serial === selectedChat)[0];

  const goodChatMessages = () => {
    if (goodChat) {
      return goodChat.messages.filter((message) => message.content !== null);
    }
  };

  const handleSubmit = (evt) => {
    dispatch({ type: actions.SET_LOADER });
    evt.preventDefault();
    const data = {};
    data.message = input[selectedChat];
    dispatch(submitMessage(data, selectedChat));
    input[selectedChat] = '';
  };

  const goodNickname = () => {
    return goodChat.users.map((chatuser) => {
      if (chatuser.pseudo !== user.pseudo) {
        return chatuser.pseudo;
      }
    }).join('');
  };

  const goodPicture = () => {
    return goodChat.users.map((chatuser) => {
      if (chatuser.pseudo !== user.pseudo) {
        return chatuser.picture;
      }
    }).join('');
  };

  const onEnterPress = (evt) => {
    if (evt.keyCode === 13 && evt.shiftKey === false) {
      evt.preventDefault();
      handleSubmit(evt);
    }
  };

  const MessagesJSX = () => (
    goodChatMessages().map((message) => {
      if (message.pseudo === user.pseudo) {
        return (
          <Box>
            <Media key={key++}>
              <Media.Item renderAs="figure" position="left">
                <Image size={32} alt={`${message.pseudo}-picture`} src={user.picture} />
              </Media.Item>
              <Media.Item>
                <Media.Content>
                  <h6 className="chatlist-content-title">
                    {message.pseudo}
                  </h6>
                  <p className="chatlist-content-msg">
                    <Moment>
                      {message.date}
                    </Moment>
                  </p>
                  <p className="chatlist-content-msg">{message.content}</p>
                </Media.Content>
              </Media.Item>
            </Media>
          </Box>
        );
      }
      return (
        <Box className="inbox-messages-user">
          <Media key={key++}>
            <Media.Item renderAs="figure" position="left">
              <Image size={32} alt={`${message.pseudo}-picture`} src={goodPicture()} />
            </Media.Item>
            <Media.Item>
              <Media.Content>
                <h6 className="chatlist-content-title" style={{ color: '#f5f5f5' }}>
                  {message.pseudo}
                </h6>
                <p className="chatlist-content-msg">
                  <Moment>
                    {message.date}
                  </Moment>
                </p>
                <p className="chatlist-content-msg">{message.content}</p>
              </Media.Content>
            </Media.Item>
          </Media>
        </Box>
      );
    })
  );

  const Message = () => {
    return (
      <>
        <Columns.Column>
          <Container className="chatlist-title">
            <Media>
              <Media.Item>
                <Image size={64} alt={`${goodNickname()}-picture`} src={goodPicture()} />
              </Media.Item>
              <Media.Content>
                <Container className="chatlist-heading">
                  <Heading size={5}>{goodNickname()}</Heading>
                </Container>
              </Media.Content>
            </Media>
          </Container>
        </Columns.Column>
        <Columns.Column>
          <AutoScroll checkBoxId="false" className="auto-first-div">
            <MessagesJSX />
          </AutoScroll>
        </Columns.Column>
      </>
    );
  };

  if (!selectedChat) {
    return (
      <div className="inbox-home">
        <h1>Bienvenue</h1>
      </div>
    );
  }

  return (
    <>
      <Message />
      <form onSubmit={handleSubmit}>
        <Form.Field>
          <Form.Label>Message</Form.Label>
          <Form.Control className="inbox-messages-form">
            <Form.Textarea onKeyDown={(evt) => onEnterPress(evt)} type="submit" rows="3" placeholder="Tapez votre message ..." name={selectedChat} onChange={handleInputChange} value={input[selectedChat]} />
          </Form.Control>
        </Form.Field>
        <Button loading={loading} fullwidth color="success" type="submit">Envoyer</Button>
      </form>
    </>
  );
};

export default Messages;
