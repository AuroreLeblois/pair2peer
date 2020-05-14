// == Import npm
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Columns, Box, Heading, Content, Button } from 'react-bulma-components';
import axios from 'axios';
import { API_URI } from 'src/store/utils';
import { getUserInbox } from 'src/store/actions';
import useInterval from '@use-it/interval';

// == Import
import ChatsList from './chatsList';
import Messages from './messages';
import './style.scss';

const Messaging = () => {
  const dispatch = useDispatch();
  const { inbox } = useSelector((state) => state);
  const [selectedChat, setSelectedChat] = useState('');

  const handleSelectChat = (evt, chatSerial) => {
    setSelectedChat(chatSerial);
  };

  const refreshInbox = () => {
    axios.get(
      `${API_URI}/inbox`,
      { withCredentials: true },
    )
      .then((res) => {
        console.log(res);
        dispatch(getUserInbox(res.data));
        sessionStorage.inbox = JSON.stringify(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  useInterval(refreshInbox, 6000 * 10);

  return (
    <>
      <Content style={{ textAlign: 'center' }}>
        <Heading size={3}>Messagerie</Heading>
        <Heading subtitle size={6}>Contactez vos pairs facilement</Heading>
        <Button onClick={refreshInbox}>Actualiser</Button>
      </Content>
      <Box className="inbox">
        <Columns>
          <Columns.Column size={2} className="inbox-chatlist">
            <ChatsList handleSelectChat={handleSelectChat} />
          </Columns.Column>
          <Columns.Column className="inbox-messages">
            <Messages refreshInbox={refreshInbox} selectedChat={selectedChat} />
          </Columns.Column>
        </Columns>
      </Box>
    </>
  );
};

export default Messaging;
