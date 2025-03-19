import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; 
import logo from "../../assets/images/Infozech.png"
// import logo from "../../assets/images/logoComp.jpg"

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        {/* <div className="logo">Your Personalized AI</div> */}
        {/* Logo Section */}
          <img src={logo} alt="Chat Logo" className="chat-logoHomePage" />

        <div className="nav-links">
          {/* <Link to="/home" className="nav-item">Home</Link> */}
          <Link to="/chat-Screen" className="nav-item">Chat with AI</Link>
          <Link to="/signin" className="nav-item">Logout</Link>
          {/* <Link to="/upload-pdf" className="nav-item upload-btn">Upload PDF</Link> */}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <h1>Welcome to the AI Experience</h1>
        <p>Chat with AI about any queries or doubts.</p>
        <div className="buttons">
          <Link to="/chat-Screen" className="btn primary">Start Chatting</Link>
          {/* <Link to="/upload-pdf" className="btn secondary">Upload a PDF</Link> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;