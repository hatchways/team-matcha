// importing modules
import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { theme } from "./themes/theme";
// importing components
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfileSetupPage from "./pages/ProfileSetupPage/ProfileSetupPage";
// importing stylesheet
import "./App.css";

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
