//importing modules
import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
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
import SoloEventEditPage from './pages/EventTypePage/SoloEventPage/SoloEventEditPage/SoloEventEditPage';
import GroupEventPage from './pages/EventTypePage/GroupEventPage/GroupEventPage';
import IntegrationPage from './pages/IntegrationsPage/IntegrationsPage';
import UpgradePage from "./pages/UpgradePage/UpgradePage";
import PageNotFound from './pages/PageNotFound/PageNotFound';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import ConfirmationPage from './pages/ConfirmationPage/ConfirmationPage';
import ApptConfirmedPage from "./pages/ApptConfirmedPage/ApptConfirmedPage";

// app history initialized
export const history = createBrowserHistory();

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isAuth: false,
      token: null,
      userId: null,
      returningUser: false
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
      let routes;
      if(this.state.isAuth) {
        routes = (
          <Switch>
            <Route exact path="/" handleLogin={this.handleLogin} component={LoginPage} />
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
            <Route exact  path="/events/event-types" component={EventTypePage} />
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
            path="/events/edit/:public_id/:eventLink/"
            exact
            render={props => (
              <SoloEventEditPage
              token={this.state.token}
              userId={this.state.userId}
                {...props}
              />
            )}
            />
            <Route exact path="/events/event-type/group" component={GroupEventPage} />
            <Route
            path="/schedule/upcoming"
            exact
            render={props => (
              <SchedulePage
                token={this.state.token}
                userId={this.state.userId}
                {...props}
              />
            )}
            />
            <Route
            path="/schedule/past"
            exact
            render={props => (
              <SchedulePage
                token={this.state.token}
                userId={this.state.userId}
                {...props}
              />
            )}
            />
            <Route exact path="/integration" component={IntegrationPage} />
            <Route exact path="/upgrade" component={UpgradePage} />
            <Route exact path="/:public_id/:eventLink" component={CalendarPage} />
            <Route exact path="/:public_id/:eventLink/:date" component={ConfirmationPage} />
            <Route exact path="/:public_id/:eventLink/invitees/:appointmentId" component={ApptConfirmedPage} />
            <Route component={PageNotFound} />
            </Switch>
        )
      } else if (this.state.isAuth === false) {
        routes = (
        <Switch>
          <Route exact path="/" handleLogin={this.handleLogin} component={LoginPage} />
          <Route exact path="/:public_id/:eventLink" component={CalendarPage} />
          <Route exact path="/:public_id/:eventLink/:date" component={ConfirmationPage} />
          <Route exact path="/:public_id/:eventLink/invitees/:appointmentId" component={ApptConfirmedPage} />
          <Redirect exact to="/" />
        </Switch>
        )
      }
      
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