import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
import { AuthorizationContext } from './Contexts/AuthorizationContext';
import './App.css';
import SigningIn from './Pages/SigningIn';
import Landing from './Pages/Landing';
import Home from './Pages/Home';

function App() {
  const { user, loadingUser } = React.useContext(AuthorizationContext);

  console.log("user");
  console.log(user);

  function getBaseComponent() {
    if (loadingUser) return SigningIn;
    else if (!user) return Landing;
    else return Home;
  }

  return (
    <Router>
      <Route path="/" exact component={getBaseComponent()} />
    </Router>
  );
}

export default App;
