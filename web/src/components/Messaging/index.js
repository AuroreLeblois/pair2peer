// == Import npm
import React, { useState } from 'react';
import { Columns, Box, Heading, Content } from 'react-bulma-components';

// == Import
import ChatsList from './chatsList';
import Messages from './messages';
import './style.scss';

const Messaging = () => {
  return (
    <>
      <Content style={{ textAlign: 'center' }}>
        <Heading size={3}>Messagerie</Heading>
        <Heading subtitle size={6}>Contactez vos pairs facilement</Heading>
      </Content>
      <Box className="inbox">
        <Columns>
          <Columns.Column size={3} className="inbox-chatlist">
            <ChatsList />
          </Columns.Column>
          <Columns.Column className="inbox-messages">
            <Messages />
          </Columns.Column>
        </Columns>
      </Box>
    </>
  );
};

export default Messaging;
