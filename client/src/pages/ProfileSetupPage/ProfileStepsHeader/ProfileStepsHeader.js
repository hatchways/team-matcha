import React from 'react';
import { Box, Typography } from '@material-ui/core';

const ProfileStepsHeader = ({step, text}) => {
    let width;
    switch(step) {
        case 1:
            width = '32%';
            break;
        case 2:
            width = '64%'
            break;
        case 3:
            width = '100%';
            break;
        default:
            width = '32%';
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