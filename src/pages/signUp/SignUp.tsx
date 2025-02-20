import React from "react";
import "./SignUp.css";

const SignUp = () => {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create Account</h2>
        <form className="signup-form">
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
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="signin-link">
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;