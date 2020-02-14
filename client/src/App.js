//importing modules
import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { theme } from "./themes/theme";
// importing components
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfileSetupPage from "./pages/ProfileSetupPage/ProfileSetupPage";
import Dashboard from './pages/Dashboard/Dashboard';
import IntegrationPage from './pages/IntegrationsPage/IntegrationsPage';
// importing stylesheet
import "./App.css";
import UpgradePage from "./pages/UpgradePage/UpgradePage";

class App extends Component{
  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
        <Switch>
          <Route
          path="/"
          exact
          render={props => (
            <LoginPage
              {...props}
            />
          )} 
          />
          <Route
          path="/events"
          exact
          render={props => (
            <Dashboard
              {...props}
            />
          )}
          />
          <Route
          path="/schedule"
          exact
          render={props => (
            <Dashboard
              {...props}
            />
          )}
          />
          <Route
          path="/integration"
          exact
          render={props => (
            <IntegrationPage
              {...props}
            />
          )}
          />
          <Route
          path="/upgrade"
          exact
          render={props => (
            <UpgradePage
              {...props}
            />
          )}
          />
          <Route
          path="/profileSetup/:userid"
          exact
          render={props => (
            <ProfileSetupPage
              {...props}
            />
          )}
          />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;