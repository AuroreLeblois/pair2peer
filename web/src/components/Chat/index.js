// == Import npm
import React from 'react';
import { Widget } from 'react-chat-widget';

// == Import css
import 'react-chat-widget/lib/styles.css';

const Chat = () => {
  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  };

  return (
    <>
      <Widget handleNewUserMessage={handleNewUserMessage} />
    </>
  );
};

export default Chat;
