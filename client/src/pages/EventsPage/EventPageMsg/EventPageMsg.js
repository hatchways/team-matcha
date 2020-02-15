import React from 'react';
import { Typography } from '@material-ui/core';

const EventPageMsg = () => (
    <Typography variant="h6" className="eventPage__message">
        You don't have any event types yet.<br/>
        <span className="eventPage__message--span">You'll want to add an event type to allow people to schedule with you.</span>
    </Typography>
);

export default EventPageMsg;