import React from 'react';
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib-esm/types"
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}>Sign in with Google</button>
        <button onClick={() => Auth.federatedSignIn()}>Sign in</button>
        <button onClick={() => Auth.signOut()}>Sign out</button>
      </header>
    </div>
  );
}

export default App;
