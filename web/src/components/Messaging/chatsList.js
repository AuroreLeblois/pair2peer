// == Import npm
import React, { useState } from 'react';
import { Columns, Media, Image, Container, Heading, Content } from 'react-bulma-components';

// == Import css
import './style.scss';

const ChatsList = () => {

  const OneChat = () => {
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
    <Columns gapless>
      <OneChat />
      <OneChat />
      <OneChat />
    </Columns>
  );
};

export default ChatsList;
