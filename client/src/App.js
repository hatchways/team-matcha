//importing modules
import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";
// importing stylesheet
import "./App.css";
// importing history module
import { createBrowserHistory } from 'history';
// local storage functions
import { setToken, setUserId, removeToken } from './Auth/Auth';
// react context
import RouteContext from './Context/Context';
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
import PageNotFound from './pages/PageNotFound/PageNotFound';

// app history initialized
export const history = createBrowserHistory();

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isAuth: false,
      token: null,
      userId: null,
    }
  }

    componentWillMount(){
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token) {
            this.setState({ isAuth: true, token, userId: userId });
        }
    }

  handleLogin = (token, userId) => {
    this.setState(() => ({
        isAuth: true,
        token: token,
        userId: userId
    }));
    setToken(token);
    setUserId(userId);
  }

  // method: handles logout
  handleLogout = (e) => {
      e.preventDefault();
      this.setState(() => ({
          isAuth: false
      }));
      removeToken();
      history.push('/');
  }

  // method : handles Auto logout 
  // handleAutoLogout = () => {
  //     this.setState(() => ({
  //         isAuth: false
  //     }));
  //     removeToken();
  // }

  render(){
      let routes = (
        
        <Switch>
        <Route
          path="/"
          exact
          render={props => (
            <LoginPage
              handleLogin={this.handleLogin}
              {...props}
            />
          )} 
          />
          <Route
          path="/events"
          exact
          render={props => (
            <Dashboard
              token={this.state.token}
              userId={this.state.userId}
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
            token={this.state.token}
            userId={this.state.userId}
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
              token={this.state.token}
              userId={this.state.userId}
              {...props}
            />
          )}
          />
          <Route
          path="/intro/:userid"
          exact
          render={props => (
            <IntroPage
              updateUserId={this.handleLogin}
              token={this.state.token}
              userId={this.state.userId}
              {...props}
            />
          )}
          />
          <Route
          render={props => (
            <PageNotFound
              {...props}
            />
          )}
          />
          </Switch>
      )
    return (
      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          <div>
          <RouteContext.Provider
              value={{ 
                        userId: this.state.userId,
                        handleLogout: this.handleLogout,
                        isAuth: this.state.isAuth,
                        token: this.state.token
                    }}
            >
            {routes}
            </RouteContext.Provider>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
