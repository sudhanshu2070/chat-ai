import React from "react";
import "./SignUp.css";
import cardImage from "../../assets/images/img1.png"; // Import the card image
import bgImage from "./assets/images/bg.jpg"; // Import the background image

const SignUp = () => {
  return (
    <div className="signup-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="signup-card">
        <img
          src={cardImage} // Use the imported card image
          alt="Registration Card"
          className="card-image"
        />
        <div className="signup-form">
          <h2>Create Account</h2>
          <form>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Enter your username" />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm your password"
              />
            </div>
            <button type="submit" className="signup-button">
              Register
            </button>
          </form>
          <p className="signin-link">
            Already have an account? <a href="/signin">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;