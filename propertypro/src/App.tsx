import React from 'react';
import { Auth, Hub } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib-esm/types"
import logo from './logo.svg';
import './App.css';

function App() {
  const [user, setUser] = React.useState<any>();
  const [customAuthState, setCustomAuthState] = React.useState();

  React.useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setUser(data);
          break;
        case "signOut":
          setUser(undefined);
          break;
        case "customOAuthState":
          setCustomAuthState(data);
      }
    });

    Auth.currentAuthenticatedUser()
      .then(user => setUser(user))
      .catch(() => console.log("Not signed in"));
  }, [])

  console.log("user");
  console.log(user);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {user ? (
          <>
            <p>Hello {user?.signInUserSession?.idToken?.payload?.email}</p>
            <button onClick={() => Auth.signOut()}>Sign out</button>
          </>
        ) : (
          <>
            <button onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}>Sign in with Google</button>
            <button onClick={() => Auth.federatedSignIn()}>Sign in</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
