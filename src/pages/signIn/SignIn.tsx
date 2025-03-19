import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import cardImage from   "../../assets/images/bgComp1.jpg"; // Import the card image from the assets folder
import bgImage from "../../assets/images/bg4Comp.jpg"; // Import the background image from the assets folder


const SignIn:React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     
     if (email === "admin@gmail.com" && password === "admin") {
      // navigate to the home page
      navigate("/home");
    } else {
      alert("Wrong email or password");
    }
  }

  return (
    <div className="signin-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="signin-card">
        <img
          src={cardImage} 
          alt="Login Card"
          className="card-image"
        />
        <div className="signin-form">
          <h2 style={{textAlign: "left"}}>Hello!</h2>
          <form onSubmit={handleSubmit}>
          <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Set email state
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Set password state
              />
            </div>
            <button type="submit" className="signin-button">
              Login
            </button>
          </form>
          <p className="signup-link">
            Don't have an account? <a href="/signup">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;