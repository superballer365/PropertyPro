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
import SessionContextProvider from "./Contexts/SessionContext";
import SessionViewerPage from "./Pages/SessionViewerPage";

function App() {
  const { user, loadingUser } = React.useContext(AuthorizationContext);

  console.log("user");
  console.log(user);

  function getRoutes() {
    if (loadingUser)
      return (
        <Route
          path="/"
          component={() => <LoadingPage text="signing in..." />}
        />
      );
    else if (!user) return <Route path="/" component={LandingPage} />;
    else {
      return (
        <SessionContextProvider>
          <>
            <Route path="/" exact component={withHeader(HomePage)} />
            <Route path="/Settings" component={withHeader(SettingsPage)} />
            <Route path="/About" component={withHeader(AboutPage)} />
            <Route
              path="/Session/:sessionId"
              exact
              component={withHeader(SessionViewerPage)}
            />
          </>
        </SessionContextProvider>
      );
    }
  }

  return <Router>{getRoutes()}</Router>;
}

export default App;
