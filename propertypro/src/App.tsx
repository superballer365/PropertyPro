import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthorizationContext } from './Contexts/AuthorizationContext';

function App() {
  const { user, loadingUser, signIn, signOut } = React.useContext(AuthorizationContext);

  console.log("user");
  console.log(user);

  function getContent() {
    if (loadingUser) {
      return <div>loading user...</div>
    } else if (!user) {
      return <button onClick={() => signIn()}>Sign in with Google</button>
    } else {
      return (
        <>
          <p>Hello {user?.signInUserSession?.idToken?.payload?.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {getContent()}
      </header>
    </div>
  );
}

export default App;
