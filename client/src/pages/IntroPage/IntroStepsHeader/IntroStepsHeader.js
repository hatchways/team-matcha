import React from 'react';
import { Box, Typography } from '@material-ui/core';

const IntroStepsHeader = ({step, text}) => {
    let width;
    let barStyles;
    switch(step) {
        case 1:
            width = '32%';
            barStyles = 'stepHeader__bar--inner32';
            break;
        case 2:
            width = '64%'
            barStyles = 'stepHeader__bar--inner64';
            break;
        case 3:
            width = '100%';
            barStyles = 'stepHeader__bar--inner100';
            break;
        default:
            width = '32%';
    }
    return (
        <Box className="stepHeader">
            <Typography className="stepHeader__title" variant="h5">{text}</Typography>
            <div className="stepHeader__bar">
                <div
                    className={barStyles}
                    style={{ width: width }}></div>
            </div>
        </Box>
    )
    
};

export default IntroStepsHeader;

