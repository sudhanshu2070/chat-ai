import React, { useState } from 'react';
import axios from 'axios';
import './ChatScreen.css'; 

interface Message {
  id: number;
  text: string;
  user: boolean; // true if message from user, false if from bot
}

const ChatScreen: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setIsLoading(true);

    try {
      const response = await axios.post('YOUR_API_ENDPOINT', { message: input });
      const botResponse = response.data; // Replace with actual response property

      setMessages(prevMessages => [
        ...prevMessages,
        { id: prevMessages.length, text: input, user: true },
        { id: prevMessages.length + 1, text: botResponse, user: false },
      ]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
    }

    setIsLoading(false);
    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="sidebar">
        <div className="user-info">
          <img src="path_to_user_image.jpg" alt="User Image" className="user-image" />
          <div className="user-details">
            <h2>User Name</h2>
            <p>Last seen: 2 hours ago</p>
          </div>
        </div>
      </div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-container ${msg.user ? 'user-message' : 'bot-message'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button className="send-button" onClick={sendMessage} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;