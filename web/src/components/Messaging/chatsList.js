// == Import npm
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Columns, Media, Image, Container, Heading, Content } from 'react-bulma-components';
import { cutStringToNCharacter } from 'src/store/utils';

// == Import css
import './style.scss';


const ChatsList = ({ handleSelectChat }) => {
  const { inbox, user } = useSelector((state) => state);

  const OneChat = () => {
    return inbox.map((chatroom) => {
      return (
        <Columns key={chatroom.chat_serial} className="chatlist">
          <Columns.Column renderAs="a" onClick={(evt) => handleSelectChat(evt, chatroom.chat_serial)} className="chatlist-content">
            <Container>
              <Media>
                <Media.Item renderAs="figure" position="left">
                  <Image size={32} alt="xooma-picture" src="https://i.imgur.com/GJ4Ittp.png" />
                </Media.Item>
                <Media.Item>
                  <Media.Content>
                    <h6 className="chatlist-content-title">
                      {chatroom.pseudo.filter((nickname) => nickname !== user.pseudo)}
                    </h6>
                    <p className="chatlist-content-msg">{cutStringToNCharacter(chatroom.messages[chatroom.messages.length - 1].content, 20)}...</p>
                  </Media.Content>
                </Media.Item>
              </Media>
            </Container>
          </Columns.Column>
        </Columns>
      );
    });
  };

  return (
    <Columns gapless>
      <OneChat />
    </Columns>
  );
};

export default ChatsList;
