import React from "react";
import "./SignIn.css";

const SignIn = () => {
  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Welcome Back</h2>
        <form className="signin-form">
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
            Sign In
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;