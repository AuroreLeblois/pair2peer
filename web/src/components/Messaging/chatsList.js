/* eslint-disable react/jsx-filename-extension */
// == Import npm
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Columns, Media, Image, Container, Heading, Content } from 'react-bulma-components';
import { cutStringToNCharacter } from 'src/store/utils';

// == Import css
import './style.scss';


const ChatsList = ({ handleSelectChat }) => {
  const { inbox, user } = useSelector((state) => state);

  return (
    inbox.map((chatroom) => {
      return (
        <Columns key={chatroom.chat_serial} className="chatlist">
          <Columns.Column renderAs="a" onClick={(evt) => handleSelectChat(evt, chatroom.chat_serial)} className="chatlist-content">
            <Container>
              <Media>
                <Media.Item renderAs="figure" position="left">
                  <Image size={32} alt="xooma-picture" src={
                    chatroom.users.map((users) => {
                      if (users.pseudo !== user.pseudo) {
                        return users.picture;
                      }
                    })
                  } />
                </Media.Item>
                <Media.Item>
                  <Media.Content>
                    <h6 className="chatlist-content-title">
                      {chatroom.users.map((users) => {
                        if (users.pseudo !== user.pseudo) {
                          return users.pseudo;
                        }
                      })}
                    </h6>
                    <p className="chatlist-content-msg">{cutStringToNCharacter(chatroom.messages[chatroom.messages.length - 1].content, 40)}...</p>
                  </Media.Content>
                </Media.Item>
              </Media>
            </Container>
          </Columns.Column>
        </Columns>
      );
    })
  );
};

export default ChatsList;
