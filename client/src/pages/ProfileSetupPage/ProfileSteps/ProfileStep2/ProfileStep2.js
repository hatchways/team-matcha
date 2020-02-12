// importing modules
import React from 'react';
import { Box, Typography } from '@material-ui/core';
// importing stylesheet
import './ProfileStep2.scss';
// importing components
import ProfileStepHeader from '../../ProfileStepsHeader/ProfileStepsHeader';
import ProfileStepFooter from '../../ProfileStepsFooter/ProfileStepsFooter';

const ProfileStep2 = ({ username, step, handleNextStep }) => (
    <Box boxShadow={3} className="step2">
        <ProfileStepHeader 
            step={step}
            text="Your Google Calendar is connected!" 
        />
        <Box className="step2__content">
            <Box className="step2__content--title--wrap">
                <Typography variant="h5" className="step2__content--title">
                    Here is how CalendApp will work with {username}
                </Typography>
            </Box>
            <Box className="step2__content--text--wrap ">
                <Typography variant="body1" className="step2__content--text">
                    1. We will check <span className="step2__content--text--span">"{username}"</span> for conflicts
                </Typography>
            </Box>
            <Box className="step2__content--text--wrap  step2__content--text--wrap--last">
                <Typography variant="body1" className="step2__content--text">
                    2. We will add event to <span className="step2__content--text--span">"{username}"</span>
                </Typography>
            </Box>
        </Box>
        <ProfileStepFooter 
            handleNextStep={handleNextStep}
            buttonText="Continue"
            displayLink={true}
        />
    </Box>
);

export default ProfileStep2;