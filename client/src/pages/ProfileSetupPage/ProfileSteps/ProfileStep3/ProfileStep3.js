// importing modules
import React from 'react';
import { Box } from '@material-ui/core';
// importing stylesheet
import './ProfileStep3.scss';
// importing components
import ProfileStepHeader from '../../ProfileStepsHeader/ProfileStepsHeader';
import ProfileStepFooter from '../../ProfileStepsFooter/ProfileStepsFooter';
import AvailableTimesDropDown from './AvailableTimesDropDown/AvailableTimesDropDown';
import DaysAvailableCheckBox from './DaysAvailableCheckBox/DaysAvailableCheckBox';


const ProfileStep3 = ({ daysAvl, step, handleNextStep, timeAvlFrom, timeAvlUntil, handleUserInput, handleDataSubmit, handleCheckbox }) => (
    <Box boxShadow={3} className="step3">
        <ProfileStepHeader 
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
        <ProfileStepFooter 
            handleNextStep={handleNextStep}
            handleDataSubmit={handleDataSubmit}
            buttonText="Finish"
            step={step}
        />
    </Box>
);

export default ProfileStep3;