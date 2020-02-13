// importing modules
import React, { Component } from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import momentTZ from 'moment-timezone';

// importing components
import ProfileStep1 from './ProfileSteps/ProfileStep1/ProfileStep1';
import ProfileStep2 from './ProfileSteps/ProfileStep2/ProfileStep2';
import ProfileStep3 from './ProfileSteps/ProfileStep3/ProfileStep3';

class ProfileSetupPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            step: 1,
            username: '',
            timezone: '',
            timeAvlFrom: '', 
            timeAvlUntil: '',
            daysAvl: {
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false
            },
            exists: false,
            users: [ // test user data
                {username: "john-doe"},
                {username: "jane-doe"},
                {username: "johnny-doe"},
                {username: "janey-doe"}
            ],
            timezonesArr: momentTZ.tz.names()
        }
    }

    // method: handles step increment
    handleNextStep = () => {
        if(this.state.step === 3 ) {
            return 
                // redirect to dashboard
        }
        this.setState((prevState) => {
            return { step: prevState.step + 1 }
        });
    };

    // method: gets the users text-input & dropwDown selection values
    handleUserInput = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    };

    // method: gets the users checkbox values
    handleCheckbox = (e) => {
        const { name } = e.target;
        
        this.setState((prevState) => {
            return {
                daysAvl: {
                    ...this.state.daysAvl,
                    [name]: !prevState.daysAvl[name]
                } 
            }
        });
    };

    // method: validates if username is unique
    handleUsernameCheck = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
        
        // test data
        const userExists = this.state.users.find((user) => user.username.toLowerCase() === value.toLowerCase());
        
        if(userExists) {
            this.setState((prevState) => {
                return {
                    exists: !prevState.exists,
                }
            });
        } else {
            this.setState({ exists: false });
        }
    };

    handleDataSubmit = () => {
        // submit data to the server
    };

    render(){
        const { step, timezone, 
                timeAvlFrom, timeAvlUntil, 
                daysAvl, exists, username } = this.state;
        let stepComponent;

        switch(step) {
            case 1:
                stepComponent = (
                    <ProfileStep1
                    exists={exists}
                    step={step}
                    timezone={timezone}
                    timezonesArr={this.state.timezonesArr}
                    username={username}
                    handleNextStep={this.handleNextStep}
                    handleUserInput={this.handleUserInput}
                    handleUsernameCheck={this.handleUsernameCheck}
                    />
                );
                break;
            case 2:
                stepComponent = (
                    <ProfileStep2
                    username="john-doe@gmail.com"
                    step={step}
                    handleNextStep={this.handleNextStep}
                    />
                );
                break;
            case 3:
                stepComponent = (
                    <ProfileStep3 
                    daysAvl={daysAvl}
                    step={step}
                    timeAvlFrom={timeAvlFrom}
                    timeAvlUntil={timeAvlUntil}
                    handleUserInput={this.handleUserInput}
                    handleNextStep={this.handleNextStep}
                    handleDataSubmit={this.handleDataSubmit}
                    handleCheckbox={this.handleCheckbox}
                    />
                );
                break;
            default:
                stepComponent = (
                    <ProfileStep1
                    exists={exists}
                    step={step}
                    timezone={timezone}
                    timezonesArr={this.state.timezonesArr}
                    username={username}
                    handleNextStep={this.handleNextStep}
                    handleUserInput={this.handleUserInput}
                    handleUsernameCheck={this.handleUsernameCheck}
                    />
                );
        }

        return (
            <Container 
                className="profileSetup"
                maxWidth="xl"
            >
            <Box className="profileSetup__logo">
                <Typography 
                    className="profileSetup__logo--main"
                    variant="h4">
                    calend
                    <span className="profileSetup__logo--span">App</span>
                </Typography>
            </Box>
                { stepComponent }
            </Container>
        )
    }
}

export default ProfileSetupPage;