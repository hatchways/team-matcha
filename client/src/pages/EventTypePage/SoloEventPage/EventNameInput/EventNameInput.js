// importing modules
import React from 'react';
import { Box, Typography } from '@material-ui/core';

const EventNameInput = ({ handleUserInput, eventNameError, eventName }) => (
    <Box className="soloEvent__form--input">
        <Typography className="soloEvent__form--input--label" variant="h6">Event name *</Typography>
        <input 
            value={eventName}
            onChange={handleUserInput} name="eventName" 
            className="soloEvent__form--input--name" 
            autoComplete="off"
            />
        <p className="soloEvent__error">{eventNameError}</p>
    </Box>
);

export default EventNameInput;