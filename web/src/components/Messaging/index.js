// == Import npm
import React, { useState } from 'react';
import { Columns, Box, Heading, Content } from 'react-bulma-components';

// == Import
import ChatsList from './chatsList';
import Messages from './messages';
import './style.scss';

const Messaging = () => {

  const [selectedChat, setSelectedChat] = useState('');

  const handleSelectChat = (evt, chatSerial) => {
    console.log(chatSerial);
    setSelectedChat(chatSerial);
  };

  return (
    <>
      <Content style={{ textAlign: 'center' }}>
        <Heading size={3}>Messagerie</Heading>
        <Heading subtitle size={6}>Contactez vos pairs facilement</Heading>
      </Content>
      <Box className="inbox">
        <Columns>
          <Columns.Column size={2} className="inbox-chatlist">
            <ChatsList handleSelectChat={handleSelectChat} />
          </Columns.Column>
          <Columns.Column className="inbox-messages">
            <Messages selectedChat={selectedChat} />
          </Columns.Column>
        </Columns>
      </Box>
    </>
  );
};

export default Messaging;
