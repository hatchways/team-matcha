// importing modules
import React from 'react';
// import { Link } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';

const ProfileStepsFooter = ({ buttonText, step, handleNextStep, handleDataSubmit }) => (
    <Box className="stepsFooter">
        <Button 
            onClick={step === 3 ? handleDataSubmit : handleNextStep}
            variant="contained" 
            className="stepsFooter__btn">{buttonText}</Button>
        {/* change p tag to <Link to="/dashboard">Set up later</Link> */}
        {step !== 3
            ? <p className="stepsFooter__link">Set up later</p> 
            : <p className="stepsFooter__link">&nbsp;</p> }
    </Box>
)

export default ProfileStepsFooter;