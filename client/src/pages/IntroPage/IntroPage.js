// importing modules
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Box, Container, Typography } from "@material-ui/core";
import momentTZ from "moment-timezone";
import { convertIntToISO } from "../../Utils/time-func";

// importing components
import IntroStep1 from "./IntroSteps/IntroStep1/IntroStep1";
import IntroStep2 from "./IntroSteps/IntroStep2/IntroStep2";
import IntroStep3 from "./IntroSteps/IntroStep3/IntroStep3";

class IntroPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      userUrl: "",
      timezoneName: momentTZ.tz.guess(true),
      timeAvlStart: 10,
      timeAvlEnd: 17,
      daysAvl: {
        sunday: false,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false
      },
      exists: false,
      users: [],
      timezonesArr: momentTZ.tz.names()
    };
  }

  // method: handles step increment
  handleNextStep = () => {
    if (this.state.step === 3) {
      return;
      // redirect to dashboard
    }
    this.setState(prevState => {
      return { step: prevState.step + 1 };
    });
  };

  // method: gets the users text-input & dropwDown selection values
  handleUserInput = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  // method: gets the users checkbox values
  handleCheckbox = e => {
    const { name } = e.target;

    this.setState(prevState => {
      return {
        daysAvl: {
          ...this.state.daysAvl,
          [name]: !prevState.daysAvl[name]
        }
      };
    });
  };

  // method: validates if userUrl is unique
  handleUserUrlCheck = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value.trim() });

    fetch("/users")
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        const userExists = data.find(
          user => user.public_id.toLowerCase() === value.toLowerCase()
        );
        if (userExists) {
          this.setState(prevState => {
            return {
              exists: !prevState.exists
            };
          });
        } else {
          this.setState({ exists: false });
        }
      });
  };

  // method: handles data submission to the server
  handleDataSubmit = () => {
    fetch(`/users/${this.props.userId.trim()}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-access-token": this.props.token
      },
      body: JSON.stringify({
        public_id: this.state.userUrl
      })
    })
      .then(data => data.json())
      .then(data => {
        this.props.updateUserId(this.props.token, this.state.userUrl);
        fetch(`/users/${this.state.userUrl.trim()}/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-access-token": this.props.token
          },
          body: JSON.stringify({
            // default event created
            name: "My first event",
            location: "Office",
            description: "Second cubicle past the bathroom.",
            duration: 60,
            url: this.props.userId.trim() + "-welcome",
            color: "#3d5afe",
            availability: {
              start: convertIntToISO(this.state.timeAvlStart, this.state.timezoneName),
              end: convertIntToISO(this.state.timeAvlEnd, this.state.timezoneName),
              days: {
                ...this.state.daysAvl
              }
            }
          })
        })
          .then(data => data.json())
          .then(data => {
            this.props.history.push("/events");
          })
          .catch(err => err);
      })
      .catch(err => err);
  };

  render() {
    const {
      step,
      timezoneName,
      timeAvlStart,
      timeAvlEnd,
      daysAvl,
      exists,
      userUrl
    } = this.state;
    let stepComponent;

    switch (step) {
      case 1:
        stepComponent = (
          <IntroStep1
            exists={exists}
            step={step}
            timezoneName={timezoneName}
            timezonesArr={this.state.timezonesArr}
            userUrl={userUrl}
            handleNextStep={this.handleNextStep}
            handleUserInput={this.handleUserInput}
            handleUserUrlCheck={this.handleUserUrlCheck}
          />
        );
        break;
      case 2:
        stepComponent = (
          <IntroStep2
            userUrl={userUrl}
            step={step}
            handleNextStep={this.handleNextStep}
          />
        );
        break;
      case 3:
        stepComponent = (
          <IntroStep3
            daysAvl={daysAvl}
            step={step}
            timeAvlStart={timeAvlStart}
            timeAvlEnd={timeAvlEnd}
            handleUserInput={this.handleUserInput}
            handleNextStep={this.handleNextStep}
            handleDataSubmit={this.handleDataSubmit}
            handleCheckbox={this.handleCheckbox}
          />
        );
        break;
      default:
        stepComponent = (
          <IntroStep1
            exists={exists}
            step={step}
            timezoneName={timezoneName}
            timezonesArr={this.state.timezonesArr}
            userUrl={userUrl}
            handleNextStep={this.handleNextStep}
            handleUserInput={this.handleUserInput}
            handleUserUrlCheck={this.handleUserUrlCheck}
          />
        );
    }

    return (
      <Container className="profileSetup" maxWidth="xl">
        <Box className="profileSetup__logo">
          <Typography className="profileSetup__logo--main" variant="h4">
            calend
            <span className="profileSetup__logo--span">app</span>
          </Typography>
        </Box>
        {stepComponent}
      </Container>
    );
  }
}

export default withRouter(IntroPage);
