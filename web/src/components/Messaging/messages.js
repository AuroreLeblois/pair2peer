// == Import npm
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Columns, Media, Image, Container, Button, Content, Form } from 'react-bulma-components';
import useInputChange from 'src/store/hooks/useInputChange';

// == Import css
import './style.scss';

const Messages = ({ selectedChat }) => {
  const [input, handleInputChange] = useInputChange();

  const { inbox, user } = useSelector((state) => state);

  const goodChat = inbox.filter((chatroom) => chatroom.chat_serial === selectedChat)[0];

  const goodChatMessages = () => {
    if (goodChat) {
      return goodChat.messages.filter((message) => message.content !== null);
    }
  };

  console.log(goodChatMessages());

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
              <Media>
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
        <form>
          <Form.Field>
            <Form.Label>Message</Form.Label>
            <Form.Control className="inbox-messages-form">
              <Form.Textarea rows="3" placeholder="Tapez votre message ..." name="message" onChange={handleInputChange} value={input.message} />
            </Form.Control>
          </Form.Field>
          <Button fullwidth color="success" type="submit">Envoyer</Button>
        </form>
      </>
    );
  };

  const NoChat = () => (
    <h1>Bienvenue</h1>
  );


  return (
    <>
      {(selectedChat) ? <Message /> : <NoChat />}
    </>
  );
};

export default Messages;
