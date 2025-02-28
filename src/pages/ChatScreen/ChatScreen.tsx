import React, { useState, useEffect } from "react";
import "./ChatScreen.css";

type Message = { text: string; sender: "user" | "bot" };

type HistoryItem = { text: string };

type Tab = "FAQs" | "History";

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [tab, setTab] = useState<Tab>("FAQs");

  useEffect(() => {
    fetchRecentRequests();
  }, []);

  const fetchRecentRequests = async () => {
    try {
      const response = await fetch("https://dummyjson.com/quotes?limit=3");
      const data = await response.json();
      setHistory(data.quotes.map((quote: { quote: string }) => ({ text: quote.quote })));
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    const newMessages: Message[] = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
  
    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      const data = await response.json();
      const botMessage: Message = { text: data.quote, sender: "bot" };
  
      // Append bot response to messages
      setMessages((prevMessages) => [...prevMessages, botMessage]);
  
      // Update history (keeping only the last 3 responses)
      setHistory((prev) => [{ text: data.quote }, ...prev.slice(0, 2)]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Oops! Something went wrong. 😢", sender: "bot" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="chat-container">
      {/* Left Section - Chat */}
      <div className="chat-section">
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
            onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Trigger on Enter key press
            placeholder="Type a message..."
            className="chat-input"
          />
          <button onClick={sendMessage} className="send-button">Send</button>
        </div>
      </div>

      {/* Right Section - Sidebar */}
      <div className="sidebar">
        <div className="tab-buttons">
          <button className={tab === "FAQs" ? "active" : ""} onClick={() => setTab("FAQs")}>FAQs</button>
          <button className={tab === "History" ? "active" : ""} onClick={() => setTab("History")}>History</button>
        </div>

        <div className="tab-content">
          {tab === "FAQs" && (
            <div className="faq-content">
              <h3>Common FAQs</h3>
              {history.map((item, index) => (
                <div key={index} className="history-item">{item.text}</div>
              ))}
            </div>
          )}
          {tab === "History" && (
            <div className="history-content">
              <h3>Message History</h3>
              {history.map((item, index) => (
                <div key={index} className="history-item">{item.text}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;