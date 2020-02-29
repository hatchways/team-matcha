import React from 'react';
import { Box, Typography } from '@material-ui/core';
import SpinnerLarge from '../../../components/Spinners/SpinnerLarge';

const EventPageMsg = ({ public_id }) => (
    <React.Fragment>
    {
        public_id !== undefined ?
        <Box className="eventPage__container">
        
            <Typography variant="h6" className="eventPage__message">
                You don't have any event types yet.<br/>
                <span className="eventPage__message--span">You'll want to add an event type to allow people to schedule with you.</span>
            </Typography> 
        </Box>
        : <SpinnerLarge />
    }
    </React.Fragment>
);

export default EventPageMsg;