import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Importing CSS for styling

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">🔥 AI Platform</div>
        <div className="nav-links">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/ai-chat" className="nav-item">AI-Chat</Link>
          <Link to="/upload-pdf" className="nav-item upload-btn">Upload PDF</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <h1>Welcome to the AI Experience</h1>
        <p>Chat with AI and upload PDFs for smart document insights.</p>
        <div className="buttons">
          <Link to="/ai-chat" className="btn primary">Start Chatting</Link>
          <Link to="/upload-pdf" className="btn secondary">Upload a PDF</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;