// importing modules
import React from 'react';
import { Box } from '@material-ui/core';
// importing components
import IntroStepHeader from '../../IntroStepsHeader/IntroStepsHeader';
import IntroStepFooter from '../../IntroStepsFooter/IntroStepsFooter';
import AvailableTimesDropDown from './AvailableTimesDropDown/AvailableTimesDropDown';
import DaysAvailableCheckBox from './DaysAvailableCheckBox/DaysAvailableCheckBox';


const IntroStep3 = ({ daysAvl, step, handleNextStep, timeAvlFrom, timeAvlUntil, handleUserInput, handleDataSubmit, handleCheckbox }) => (
    <Box boxShadow={3} className="step3">
        <IntroStepHeader 
            step={step}
            text="Set your availability" 
        />
        <Box className="step3__content">
            <AvailableTimesDropDown 
                timeAvlFrom={timeAvlFrom}
                timeAvlUntil={timeAvlUntil}
                handleUserInput={handleUserInput}
            />
            <DaysAvailableCheckBox 
                handleCheckbox={handleCheckbox}
                daysAvl={daysAvl}
            />
        </Box>
        <IntroStepFooter 
            handleNextStep={handleNextStep}
            handleDataSubmit={handleDataSubmit}
            buttonText="Finish"
            step={step}
        />
    </Box>
);

export default IntroStep3;