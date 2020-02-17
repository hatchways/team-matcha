//importing modules
import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { theme } from "./themes/theme";
// importing components
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfileSetupPage from "./pages/ProfileSetupPage/ProfileSetupPage";
import Dashboard from './pages/Dashboard/Dashboard';
import SchedulePage from './pages/SchedulePage/SchedulePage';
import IntegrationPage from './pages/IntegrationsPage/IntegrationsPage';
import UpgradePage from "./pages/UpgradePage/UpgradePage";
// importing stylesheet
import "./App.css";


class App extends Component{
  render(){
      let routes = (
        <React.Fragment>
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
          path="/schedule/upcoming"
          exact
          render={props => (
            <SchedulePage
              {...props}
            />
          )}
          />
          <Route
          path="/schedule/past"
          exact
          render={props => (
            <SchedulePage
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
          path="/intro/:userid"
          exact
          render={props => (
            <ProfileSetupPage
              {...props}
            />
          )}
          />
      </React.Fragment>
      )
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
        <Switch>
          {routes}
        </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;