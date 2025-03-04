import React, { useState, useEffect } from "react";
import "./ChatScreen.css";

type Message = { text: string; sender: "user" | "bot" };
type HistoryItem = { text: string };

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [faqs, setFaqs] = useState<{ text: string }[]>([]);

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
      // const response = await fetch("https://dummyjson.com/quotes/random");
      const response = await fetch("http://127.0.0.1:8000/api/v1/query-pdf", {
          method:"POST", 
          headers:{
            "Accept": "application/json",
            "Content-Type": "application/json",
          }, 
          body: JSON.stringify({ question: input }), // Sending user's question
        }
      );
      const data = await response.json();
      let botResponse = data.answer ? data.answer : data.detail; //in the case of bad request/no pdf uploaded
      console.log(data);
  
      // Appending bot response to messages
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
  
      // Updating history (keeping only the last 3 responses)
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
  
  const formatMessage = (text:string ) => {
    return text
      .replace(/(?<=\d\.) /g, "• ") // Convert numbered lists
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold text
      .replace(/\n/g, "<br>"); // Preserve line breaks
  };

  return (
    <div className="chat-container">
      {/* Left Section - Chat */}
      <div className="chat-section">
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {/* <span>{msg.text}</span> */}
              <span dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} />
            </div>
          ))}
          {isLoading && <div className="message bot typing">Typing...</div>}
        </div>

        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Triggerring on the "Enter" key press
            placeholder="Type a message..."
            className="chat-input"
          />
          <button onClick={sendMessage} className="send-button">Send</button>
        </div>
      </div>

      {/* Right Section - Sidebar */}
      <div className="sidebar">
        <div className="sidebar-section">
          {/* Upper Half - FAQs */}
          <div className="faq-section">
            <h3 className="section-heading">Common FAQs</h3>
            <div className="faq-content">
              {faqs.length > 0 ? (
                faqs.map((item, index) => (
                  <div key={index} className="faq-item">{item.text}</div>
                ))
              ) : (
                <p className="empty-message">No FAQs available.</p>
              )}
            </div>
          </div>

          {/* Lower Half - History */}
          <div className="history-section">
            <h3 className="section-heading">Message History</h3>
            <div className="history-content">
              {history.length > 0 ? (
                history.map((item, index) => (
                  <div key={index} className="history-item">{item.text}</div>
                ))
              ) : (
                <p className="empty-message">No message history yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ChatScreen;