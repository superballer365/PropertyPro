import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { AuthorizationContext } from "./Contexts/AuthorizationContext";
import "./App.css";
import LoadingPage from "./Pages/LoadingPage";
import LandingPage from "./Pages/LandingPage";
import HomePage from "./Pages/HomePage";
import { withHeader } from "./Components/Header/Header";
import SettingsPage from "./Pages/SettingsPage";
import AboutPage from "./Pages/AboutPage";

function App() {
  const { user, loadingUser } = React.useContext(AuthorizationContext);

  console.log("user");
  console.log(user);

  function getBaseComponent() {
    if (loadingUser) return () => <LoadingPage text="signing in..." />;
    else if (!user) return LandingPage;
    else return withHeader(HomePage);
  }

  return (
    <Router>
      <Route path="/" exact component={getBaseComponent()} />
      <Route path="/Settings" component={withHeader(SettingsPage)} />
      <Route path="/About" component={withHeader(AboutPage)} />
    </Router>
  );
}

export default App;
