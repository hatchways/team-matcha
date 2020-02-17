// importing modules
import React from 'react';
import { Box, Typography } from '@material-ui/core';
// importing components
import IntroStepHeader from '../../IntroStepsHeader/IntroStepsHeader';
import IntroStepFooter from '../../IntroStepsFooter/IntroStepsFooter';

const IntroStep2 = ({ userUrl, step, handleNextStep }) => (
    <Box boxShadow={3} className="step2">
        <IntroStepHeader 
            step={step}
            text="Your Google Calendar is connected!" 
        />
        <Box className="step2__content">
            <Box className="step2__content--title--wrap">
                <Typography variant="h5" className="step2__content--title">
                    Here is how CalendApp will work with {userUrl}
                </Typography>
            </Box>
            <Box className="step2__content--text--wrap ">
                <Typography variant="body1" className="step2__content--text">
                    1. We will check <span className="step2__content--text--span">"{userUrl}"</span> for conflicts
                </Typography>
            </Box>
            <Box className="step2__content--text--wrap  step2__content--text--wrap--last">
                <Typography variant="body1" className="step2__content--text">
                    2. We will add event to <span className="step2__content--text--span">"{userUrl}"</span>
                </Typography>
            </Box>
        </Box>
        <IntroStepFooter 
            handleNextStep={handleNextStep}
            buttonText="Continue"
            displayLink={true}
        />
    </Box>
);

export default IntroStep2;