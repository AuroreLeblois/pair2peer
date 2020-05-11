// == Import npm
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Columns, Media, Image, Container, Button, Content, Form } from 'react-bulma-components';
import useInputChange from 'src/store/hooks/useInputChange';

// == Import css
import './style.scss';

const Messages = () => {
  const [input, handleInputChange] = useInputChange();

  const { inbox } = useSelector((state) => state);
  console.log(inbox);

  const MessageOne = () => {
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
                    <h6 className="chatlist-content-title">xOOma</h6>
                    <p className="chatlist-content-msg">Vendôme, France</p>
                  </Media.Content>
                </Media.Item>
              </Media>
            </Container>
          </Columns.Column>
        </Columns>
        <Columns.Column className="inbox-messages-content">
          <Content>
            Pouet
          </Content>
        </Columns.Column>
      </>
    );
  };

  const Message2 = () => {
    return (
      <Columns className="chatlist">
        <Columns.Column className="chatlist-content">
          <Container>
            <Media>
              <Media.Item renderAs="figure" position="left">
                <Image size={32} alt="xooma-picture" src="https://i.imgur.com/GJ4Ittp.png" />
              </Media.Item>
              <Media.Item>
                <Media.Content>
                  <h6 className="chatlist-content-title">xOOma</h6>
                  <p className="chatlist-content-msg">Hello ça te dis de coder un p...</p>
                </Media.Content>
              </Media.Item>
            </Media>
          </Container>
        </Columns.Column>
      </Columns>
    );
  };

  return (
    <>
      <MessageOne />
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

export default Messages;
