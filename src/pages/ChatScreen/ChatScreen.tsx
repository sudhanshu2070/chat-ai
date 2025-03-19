import React, { useState, useEffect } from "react";
import "./ChatScreen.css";
import logo from "../../assets/images/Infozech.png"
import backGroundImage from "../../assets/images/logo212Comp.jpg"

type Message = { text: string; sender: "user" | "bot" };
type HistoryItem = { text: string };

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [faqs, setFaqs] = useState<{ text: string }[]>([
    { text: "What is the process to Add a New customer in iBill?" },
    { text: "How can I associate MA/Charges Details with the added customer?" },
    { text: "How can I view already associated Charges / Master Agreements?" }
  ]);  

  const fetchRecentRequests = () => {
    const storedHistory = localStorage.getItem("chatHistory");
    if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
    }
  };

  useEffect(() => {
    fetchRecentRequests();
  }, []);

  const WORD_LIMIT = 20; // Maximum words before truncating

  const truncateText = (text: string, limit: number) => {
    const words = text.split(" ");
    return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
  };

  const saveMessageToHistory = (message: Message) => {
    const truncatedMessage: Message = {
      ...message,
      text: truncateText(message.text, WORD_LIMIT),
    };
  
    const updatedHistory = [truncatedMessage, ...history.slice(0, 2)]; // Keep only last 3
    localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
    setHistory(updatedHistory); // Update state to reflect UI changes
  };


  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim(); // Use provided text or input field value
    if (!textToSend) return;
  
    const newMessages: Message[] = [...messages, { text: textToSend, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
  
    // Save user message to localStorage
    saveMessageToHistory({ text: textToSend, sender: "user" });

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/query-pdf", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: textToSend }),
      });

      const data = await response.json();
      let botResponse = data.answer ? data.answer : data.detail; // Handle API response
      console.log(data);

      // Append bot response to messages
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);

      // Save bot response to localStorage
      saveMessageToHistory({ text: botResponse, sender: "bot" });

    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage: Message = { text: "Oops! Something went wrong. 😢", sender: "bot" };
      
      setMessages((prevMessages) => [...prevMessages, errorMessage]);

      // Save error response to localStorage
      saveMessageToHistory(errorMessage);
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

  const handleFaqClick = (faqText:string) => {
      // Added the FAQ text to the chat immediately for better UX
      setMessages((prevMessages) => [...prevMessages, { text: faqText, sender: "user" }]);
      setInput(faqText); // Clear the input field
      console.log(`faqText : ${faqText}`);
      sendMessage(faqText); // Send the message
  };

  return (
    <div className="chat-container">

      {/* Logo Section */}
      <div className="logo-container">
        <img src={logo} alt="Chat Logo" className="chat-logo" />
      </div>

      {/* Left Section - Chat */}
      <div className="chat-section">
      <div className="chat-box" style={{ backgroundImage: `url(${backGroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
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
            placeholder="Ask me anything.."
            className="chat-input"
          />
          <button onClick={() => sendMessage()} className="send-button">Send</button>
        </div>
      </div>

      {/* Right Section - Sidebar */}
      <div className="sidebar">
        <div className="sidebar-section">
          {/* Upper Half - FAQs */}
          <div className="faq-section">
              <h3 className="section-headingFAQ">Common FAQs</h3>
              <div className="faq-content">
                {faqs.length > 0 ? (
                  <ul className="faq-list">
                    {faqs.map((item, index) => (
                      <li 
                          key={index} 
                          className="faq-item"
                          onClick={() => handleFaqClick(item.text)} // Click handler
                      >
                        {item.text}
                      </li>
                      ))}
                  </ul>
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
                <ul className="history-list">
                  {history.map((item, index) => (
                    <li key={index} className="history-item">{item.text}</li>
                  ))}
                </ul>
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