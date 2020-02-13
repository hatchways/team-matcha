// importing modules
import React from 'react';
import { Box, MenuItem, Select, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { green, red } from '@material-ui/core/colors';
// importing components
import ProfileStepHeader from '../../ProfileStepsHeader/ProfileStepsHeader';
import ProfileStepFooter from '../../ProfileStepsFooter/ProfileStepsFooter';

const ProfileStep1 = ({ exists, step, username, timezone, handleNextStep, handleUserInput, handleUsernameCheck }) => {
    return(
    <Box boxShadow={3} className="step1">
        <ProfileStepHeader
            step={step}
            text="Welcome to CalendApp!" 
        />
        <Box className="step1__form--wrap">
            <Box className="step1__form">
                <Box className="step1__form--input--wrap">
                    <Typography variant="body1" className="step1__form--label">Create your CalendApp URL:</Typography>
                    <Box className="step1__form--input--container">
                        <p className="step1__form--input--placeholder">calendapp.com/</p>
                        {/*add event handler to check for available unique usernames*/}
                        <input 
                            onChange={handleUsernameCheck}
                            className="step1__form--input" 
                            name="username"
                            autoComplete="off"
                            value={username}
                            type="text"
                        />
                        { username.length > 0 && exists === false ? <CheckCircleIcon style={{ color: green[500] }} /> : null }
                        { username.length > 0 && exists === true ? <CancelIcon style={{ color: red[800] }} /> : null }
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
            </Box>
        </Box>
        <ProfileStepFooter 
            handleNextStep={handleNextStep}
            buttonText="Continue"
            username={username}
            exists={exists}
        />
    </Box>
    )
};

export default ProfileStep1;