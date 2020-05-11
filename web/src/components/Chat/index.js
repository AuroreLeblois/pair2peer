// // == Import npm
// import React, { useState } from 'react';
// import { Launcher } from 'react-chat-window';

// // == Import css

// const Chat = () => {
//   const [messageList, setMessageList] = useState([]);

//   const onMessageWasSent = (message) => {
//     setMessageList([...messageList, message]);
//   };

//   const sendMessage = (text) => {
//     if (text.length > 0) {
//       setMessageList([...messageList, {
//         author: 'them',
//         type: 'text',
//         data: { text },
//       }]);
//     }
//   };

//   return (
//     <>
//       <Launcher
//         agentProfile={{
//           teamName: 'react-chat-window',
//           imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
//         }}
//         onMessageWasSent={onMessageWasSent}
//         messageList={messageList}
//         showEmoji
//       />
//     </>
//   );
// };

// export default Chat;
