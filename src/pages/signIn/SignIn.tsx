import React from 'react';
import './SignIn.css'; 

const SignIn: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login to your Account</h2>
        <p>See what is going on with your business</p>
        <button className="google-button">Continue with Google</button>
        <div className="divider">or Sign in with Email</div>
        <form>
          <div className="input-group">
            <input type="email" placeholder="Email" required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" required />
          </div>
          <div className="options">
            <div className="remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember Me</label>
            </div>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p>Not Registered Yet? <a href="#">Create an account</a></p>
      </div>
    </div>
  );
};

export default SignIn;