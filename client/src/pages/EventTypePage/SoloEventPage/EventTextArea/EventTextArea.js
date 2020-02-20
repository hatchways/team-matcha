// importing modules
import React from 'react';
import { Box, Typography } from '@material-ui/core';

const EventTextArea = ({handleUserInput}) => (
    <Box className="soloEvent__form--input">
        <Typography className="soloEvent__form--input--label" variant="h6">Description/Instructions</Typography>
        <textarea 
            onChange={handleUserInput}
            name="eventDescription"
            rows="10" cols="50"
            placeholder="Write a summary and any details your invitee should know about the event" 
            className="soloEvent__form--input--textarea">
        </textarea>
    </Box>
);

export default EventTextArea;