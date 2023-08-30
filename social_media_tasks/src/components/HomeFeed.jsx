

import React, { useState } from 'react';
import './HomeFeed.css';

const HomeFeed = ({ user }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello, everyone!', author: 'User1' },
    { id: 2, text: 'Welcome to the platform!', author: 'User2' },
  ]);

  return (
    <div>
      <h2>Home Feed</h2>
      {messages.map((message) => (
        <div key={message.id}>
          <p>{message.text}</p>
          <p>Posted by: {message.author}</p>
        </div>
      ))}
    </div>
  );
};

export default HomeFeed;
