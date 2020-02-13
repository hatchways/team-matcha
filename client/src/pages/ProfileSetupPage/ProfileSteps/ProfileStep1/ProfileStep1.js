// importing modules
import React from 'react';
import { Box, MenuItem, Select, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { green, red } from '@material-ui/core/colors';
// importing components
import ProfileStepHeader from '../../ProfileStepsHeader/ProfileStepsHeader';
import ProfileStepFooter from '../../ProfileStepsFooter/ProfileStepsFooter';

const ProfileStep1 = ({ exists, step, 
    username, timezone, 
    timezonesArr, handleNextStep, 
    handleUserInput, handleUsernameCheck }) => {
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
                        <input 
                            onChange={handleUsernameCheck}
                            className="step1__form--input" 
                            name="username"
                            autoComplete="off"
                            value={username}
                            type="text"
                        />
                        { username.length >= 6 && username.length <= 24 && exists === false ? <CheckCircleIcon style={{ color: green[500] }} className="step1__form--input--icon" /> : null }
                        { username.length >= 6 && username.length <= 24 && exists === true ? <CancelIcon style={{ color: red[800] }} className="step1__form--input--icon" /> : null }
                    </Box>
                </Box>
                <Box className="step1__form--select--wrap">
                    <Typography variant="body1" className="step1__form--label">Select your Time zone:</Typography>
                    <div className="step1__form--select">
                        <Select
                        disableUnderline
                        name="timezone"
                        variant="outlined"
                        value={timezone}
                        onChange={handleUserInput}
                        >
                            {
                                timezonesArr.length > 0 
                                    ? timezonesArr.map((timezoneVal) => { 
                                    return (
                                        <MenuItem key={timezoneVal} value={timezoneVal}> 
                                            <p className="step1__form--select--text">
                                                {timezoneVal}
                                            </p>
                                        </MenuItem> )
                                    }) 
                                    : null
                            }
                        </Select>
                    </div>
                </Box>
            </Box>
        </Box>
        { username.length >= 6 && exists === false && username.length <= 24 ? 
        <ProfileStepFooter 
            handleNextStep={handleNextStep}
            buttonText="Continue"
        /> : <ProfileStepFooter 
                handleNextStep={handleNextStep}
                buttonText="Continue"
                disableBtn={true}
        /> }
    </Box>
    )
};

export default ProfileStep1;