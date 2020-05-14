// == Import npm
import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Columns, Media, Image, Container, Button, Content, Form } from 'react-bulma-components';
import useInputChange from 'src/store/hooks/useInputChange';
import { submitMessage } from 'src/store/actions';

// == Import css
import './style.scss';

const Messages = ({ selectedChat, refreshInbox }) => {
  const dispatch = useDispatch();

  let key = 1;
  const { inbox, user } = useSelector((state) => state);
  const [input, handleInputChange] = useInputChange();

  const goodChat = inbox.filter((chatroom) => chatroom.chat_serial === selectedChat)[0];

  const goodChatMessages = () => {
    if (goodChat) {
      return goodChat.messages.filter((message) => message.content !== null);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = {};
    data.message = input[selectedChat];
    dispatch(submitMessage(data, selectedChat));
    input[selectedChat] = '';
    refreshInbox();
  };

  useCallback(refreshInbox, [inbox]);

  const Message = () => {
    return (
      <>
        <Columns>
          <Columns.Column className="chatlist-content">
            <Container>
              <Media>
                <Media.Item renderAs="figure" position="left">
                  <Image size={32} alt="xooma-picture" src="https://i.imgur.com/GJ4Ittp.png" />
                </Media.Item>
                <Media.Item>
                  <Media.Content>
                    <h6 className="chatlist-content-title">{goodChat.pseudo.filter((nickname) => nickname !== user.pseudo)}</h6>
                  </Media.Content>
                </Media.Item>
              </Media>
            </Container>
          </Columns.Column>
        </Columns>
        <Columns.Column className="inbox-messages-content">
          <Content>
            {goodChatMessages().map((message) => (
              <Media key={key++}>
                <Media.Item renderAs="figure" position="left">
                  <Image size={32} alt="xooma-picture" src="https://i.imgur.com/GJ4Ittp.png" />
                </Media.Item>
                <Media.Item>
                  <Media.Content>
                    <h6 className="chatlist-content-title">
                      {message.pseudo}
                    </h6>
                    <p className="chatlist-content-msg">{message.date}</p>
                    <p className="chatlist-content-msg">{message.content}</p>
                  </Media.Content>
                </Media.Item>
              </Media>
            ))}
          </Content>
        </Columns.Column>
      </>
    );
  };

  const NoChat = () => (
    <h1>Bienvenue</h1>
  );

  if (!selectedChat) {
    return <h1>Bienvenue</h1>;
  }


  return (
    <>
      <Message />
      <form onSubmit={handleSubmit}>
        <Form.Field>
          <Form.Label>Message</Form.Label>
          <Form.Control className="inbox-messages-form">
            <Form.Textarea rows="3" placeholder="Tapez votre message ..." name={selectedChat} onChange={handleInputChange} value={input[selectedChat]} />
          </Form.Control>
        </Form.Field>
        <Button fullwidth color="success" type="submit">Envoyer</Button>
      </form>
    </>
  );
};

export default Messages;
