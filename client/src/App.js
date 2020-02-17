//importing modules
import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { theme } from "./themes/theme";
// importing components
import LoginPage from "./pages/LoginPage/LoginPage";
import IntroPage from "./pages/IntroPage/IntroPage";
import Dashboard from './pages/Dashboard/Dashboard';
import SchedulePage from './pages/SchedulePage/SchedulePage';
import EventTypePage from './pages/EventTypePage/EventTypePage';
import SoloEventPage from './pages/EventTypePage/SoloEventPage/SoloEventPage';
import GroupEventPage from './pages/EventTypePage/GroupEventPage/GroupEventPage';
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
          path="/events/event-types"
          exact
          render={props => (
            <EventTypePage
              {...props}
            />
          )}
          />
          <Route
          path="/events/event-type/solo"
          exact
          render={props => (
            <SoloEventPage
              {...props}
            />
          )}
          />
          <Route
          path="/events/event-type/group"
          exact
          render={props => (
            <GroupEventPage
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
            <IntroPage
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