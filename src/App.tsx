import React from 'react';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';

function App() {
  return (
    <div className="App">
      {/* Use routing or state to toggle between SignIn and SignUp */}
      <SignIn />
      {/* <SignUp /> */}
    </div>
  );
}

export default App;
