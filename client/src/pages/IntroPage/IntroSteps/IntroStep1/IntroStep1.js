// importing modules
import React from 'react';
import { Box, MenuItem, Select, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { green, red } from '@material-ui/core/colors';
// importing components
import IntroStepHeader from '../../IntroStepsHeader/IntroStepsHeader';
import IntroStepFooter from '../../IntroStepsFooter/IntroStepsFooter';

const IntroStep1 = ({ exists, step, 
    userUrl, timezoneName, 
    timezonesArr, handleNextStep, 
    handleUserInput, handleUserUrlCheck }) => {
    return(
    <Box boxShadow={3} className="step1">
        <IntroStepHeader
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
                            onChange={handleUserUrlCheck}
                            className="step1__form--input" 
                            name="userUrl"
                            autoComplete="off"
                            value={userUrl}
                            type="text"
                        />
                        { userUrl.length >= 8 && userUrl.length < 128 && exists === false ? <CheckCircleIcon style={{ color: green[500] }} className="step1__form--input--icon" /> : null }
                        { userUrl.length >= 8 && userUrl.length < 128 && exists === true ? <CancelIcon style={{ color: red[800] }} className="step1__form--input--icon" /> : null }
                    </Box>
                </Box>
                <Box className="step1__form--select--wrap">
                    <Typography variant="body1" className="step1__form--label">Select your Time zone:</Typography>
                    <Box className="step1__form--select">
                        <Select
                        disableUnderline
                        name="timezoneName"
                        variant="outlined"
                        value={timezoneName}
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
                    </Box>
                </Box>
            </Box>
        </Box>
        { userUrl.length >= 8 && exists === false && userUrl.length <= 32 ? 
        <IntroStepFooter 
            handleNextStep={handleNextStep}
            buttonText="Continue"
        /> : <IntroStepFooter 
                handleNextStep={handleNextStep}
                buttonText="Continue"
                disableBtn={true}
        /> }
    </Box>
    )
};

export default IntroStep1;