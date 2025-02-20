import React from "react";
import "./SignIn.css";
import cardImage from   "../../assets/images/img1.png"; // Import the card image from the assets folder


const SignIn = () => {
  return (
    <div className="signin-container">
      <div className="signin-card">
        <img
          src={cardImage} // Path to the card image in the public folder
          alt="Login Card"
          className="card-image"
        />
        <div className="signin-form">
          <h2>Good Morning!</h2>
          <form>
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