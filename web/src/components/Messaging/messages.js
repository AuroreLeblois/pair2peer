// == Import npm
import React, { useState } from 'react';
import { Columns, Media, Image, Container, Heading, Content, Form } from 'react-bulma-components';

// == Import css
import './style.scss';

const Messages = () => {

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
      <Form.Field>
        <Form.Label>Message</Form.Label>
        <Form.Control className="inbox-messages-form">
          <Form.Textarea placeholder="Textarea" />
        </Form.Control>
      </Form.Field>
    </>
  );
};

export default Messages;
