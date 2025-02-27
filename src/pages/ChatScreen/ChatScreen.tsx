import React, { useState } from "react";
import "./ChatScreen.css";

type Message = { text: string; sender: "user" | "bot" };

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    const newMessages: Message[] = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Fetch response from free API (Random Quote)
      //const response = await fetch("https://api.quotable.io/random");
      const response = await fetch("https://dummyjson.com/quotes/random");
      const data = await response.json();

      // Add bot response to chat
      setMessages([...newMessages, { text: data.quote, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([...newMessages, { text: "Oops! Something went wrong. 😢", sender: "bot" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <span>{msg.text}</span>
          </div>
        ))}
        {isLoading && <div className="message bot typing">Typing...</div>}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button onClick={sendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default ChatScreen;