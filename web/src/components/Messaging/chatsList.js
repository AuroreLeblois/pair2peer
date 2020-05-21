/* eslint-disable react/jsx-filename-extension */
// == Import npm
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Columns, Media, Image, Container, Heading, Content, Button } from 'react-bulma-components';
import { cutStringToNCharacter } from 'src/store/utils';

// == Import css
import './style.scss';


const ChatsList = ({ handleSelectChat, colorButton }) => {
  const { inbox, user } = useSelector((state) => state);

  return (
    <Button.Group size="medium">
      {inbox.map((chatroom) => {
        return (
              <Button color={colorButton} fullwidth onClick={(evt) => handleSelectChat(evt, chatroom.chat_serial)} className="chatlist-content">
                <Media className="chatlist-item">
                  <Media.Item renderAs="figure" position="left">
                    <Image size={32}
                      alt={`${
                        chatroom.users.map((users) => {
                          if (users.pseudo !== user.pseudo) {
                            return users.pseudo;
                          }
                        }).join('')
                      }-picture`}
                      src={
                        chatroom.users.map((users) => {
                          if (users.pseudo !== user.pseudo) {
                            console.log(users.picture);
                            return users.picture;
                          }
                        }).join('')
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
              </Button>
        );
      })}
    </Button.Group>
  );
};

export default ChatsList;
