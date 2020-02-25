// importing modules
import React from 'react';
import { Box } from '@material-ui/core';
import { allFalse } from '../../../../Utils/obj-func';
// importing components
import IntroStepHeader from '../../IntroStepsHeader/IntroStepsHeader';
import IntroStepFooter from '../../IntroStepsFooter/IntroStepsFooter';
import AvailableTimesDropDown from './AvailableTimesDropDown/AvailableTimesDropDown';
import DaysAvailableCheckBox from './DaysAvailableCheckBox/DaysAvailableCheckBox';


const IntroStep3 = ({ daysAvl, step, timeAvlStart, timeAvlEnd, handleUserInput, handleDataSubmit, handleCheckbox }) => (
    <Box boxShadow={3} className="step3">
        <IntroStepHeader 
            step={step}
            text="Set your availability" 
        />
        <Box className="step3__content">
            <AvailableTimesDropDown 
                timeAvlStart={timeAvlStart}
                timeAvlEnd={timeAvlEnd}
                handleUserInput={handleUserInput}
            />
            <DaysAvailableCheckBox 
                handleCheckbox={handleCheckbox}
                daysAvl={daysAvl}
            />
        </Box>
        { (!(allFalse(daysAvl) || (timeAvlEnd < timeAvlStart))) ? 
            <IntroStepFooter 
                handleDataSubmit={handleDataSubmit}
                buttonText="Finish"
                step={step}
            /> : <IntroStepFooter 
                    handleDataSubmit={handleDataSubmit}
                    buttonText="Finish"
                    step={step}
                    disableBtn={true}
            /> }
    </Box>
);

export default IntroStep3;