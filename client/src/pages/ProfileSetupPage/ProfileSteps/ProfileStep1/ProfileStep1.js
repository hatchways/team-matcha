// importing modules
import React from 'react';
import { Box, MenuItem, Select, Typography } from '@material-ui/core';
// importing stylesheet
import './ProfileStep1.scss';
// importing components
import ProfileStepHeader from '../../ProfileStepsHeader/ProfileStepsHeader';
import ProfileStepFooter from '../../ProfileStepsFooter/ProfileStepsFooter';

const ProfileStep1 = ({ step, timezone, handleNextStep, handleUserInput }) => {
    return(
    <Box boxShadow={3} className="step1">
        <ProfileStepHeader
            step={step}
            text="Welcome to CalendApp!" 
        />
        <Box className="step1__form--wrap">
            <form className="step1__form">
                <Box className="step1__form--input--wrap">
                    <Typography variant="body1" className="step1__form--label">Create your CalendApp URL:</Typography>
                    <Box className="step1__form--input--container">
                        <p className="step1__form--input--placeholder">calendapp.com/</p>
                        {/*add event handler to check for available unique usernames*/}
                        <input 
                            onChange={handleUserInput}
                            className="step1__form--input" 
                            name="username"
                            autoComplete="off"
                            type="text"/>
                    </Box>
                </Box>
                <Box className="step1__form--select--wrap">
                    <Typography variant="body1" className="step1__form--label">Select your Time zone:</Typography>
                    {/*change to a drop down list of time zones*/}
                    <div className="step1__form--select">
                        <Select
                        disableUnderline
                        name="timezone"
                        variant="outlined"
                        value={timezone}
                        onChange={handleUserInput}
                        >
                            <MenuItem value={0}> 
                                <p className="step1__form--select--text">UTC Time&nbsp;
                                    <span className="step1__form--select--text--span">(11:31)</span>
                                </p>
                            </MenuItem>
                        </Select>
                    </div>
                    {/*change to a drop down list of time zones*/}
                </Box>
            </form>
        </Box>
        <ProfileStepFooter 
            handleNextStep={handleNextStep}
            buttonText="Continue"
            displayLink={true}
        />
    </Box>
    )
};

export default ProfileStep1;