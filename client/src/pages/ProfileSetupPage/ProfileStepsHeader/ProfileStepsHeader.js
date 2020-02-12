import React from 'react';
import { Box, Typography } from '@material-ui/core';
import './ProfileStepsHeader.scss';

const ProfileStepsHeader = ({step, text}) => {
    let width;
    if(step === 1) {
        width = '32%';
    } else if(step === 2) {
        width = '64%'
    } else if (step === 3) {
        width = '100%';
    }
    return (
        <Box className="stepHeader">
            <Typography className="stepHeader__title" variant="h5">{text}</Typography>
            <div className="stepHeader__bar">
                <div
                    style={{ width: width }}
                    className="stepHeader__bar--inner"></div>
            </div>
        </Box>
    )
    
};

export default ProfileStepsHeader;