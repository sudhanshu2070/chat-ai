import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import ChatScreen from './pages/ChatScreen/ChatScreen';

function App() {
  return(
  <Router>
  <div>
    {/* Navigation Links (Optional) */}
    {/* <nav style={{ textAlign: "center", margin: "20px 0" }}>
      <Link to="/signin" style={{ margin: "0 10px", textDecoration: "none", color: "#667eea", fontWeight: "600" }}>
        Sign In
      </Link>
      <Link to="/signup" style={{ margin: "0 10px", textDecoration: "none", color: "#667eea", fontWeight: "600" }}>
        Sign Up
      </Link>
    </nav> */}

    {/* Routes */}
    <Routes>
      <Route path="/" element={<SignIn />} /> {/* Default route */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/chat-Screen" element={<ChatScreen />} />
    </Routes>
  </div>
</Router>

  );
}

export default App;
