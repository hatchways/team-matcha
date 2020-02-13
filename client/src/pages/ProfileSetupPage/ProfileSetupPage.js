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
            userUrl: '',
            timezoneName: momentTZ.tz.guess(true),
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
                {userUrl: "john-doe"},
                {userUrl: "jane-doe"},
                {userUrl: "johnny-doe"},
                {userUrl: "janey-doe"}
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

    // method: validates if userUrl is unique
    handleUserUrlCheck = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
        
        // test data
        const userExists = this.state.users.find((user) => user.userUrl.toLowerCase() === value.toLowerCase());
        
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

    // method: handles data submission to the server
    handleDataSubmit = () => {
        const currentDate = momentTZ().format('YYYY-MM-D');
        const data = { // data to be sent to the server
            userUrl: this.state.userUrl,
            timezoneName: this.state.timezoneName,
            utcOffset: momentTZ(currentDate).tz(this.state.timezoneName).format('Z'),
            timeAvlFrom: this.state.timeAvlFrom, 
            timeAvlUntil: this.state.timeAvlUntil,
            ...this.state.daysAvl
        }
        console.log(data);
    };

    render(){
        const { step, timezoneName, 
                timeAvlFrom, timeAvlUntil, 
                daysAvl, exists, userUrl } = this.state;
        let stepComponent;

        switch(step) {
            case 1:
                stepComponent = (
                    <ProfileStep1
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
                    <ProfileStep2
                    userUrl={userUrl}
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