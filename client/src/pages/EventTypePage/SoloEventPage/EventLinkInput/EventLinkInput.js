// importing modules
import React from 'react';
import { Box,Typography } from '@material-ui/core';

const EventLinkInput = ({ handleUserInput, eventLinkError, username, eventLink }) => (
    <Box className="soloEvent__form--input">
        <Typography className="soloEvent__form--input--label" variant="h6">Event Link *</Typography>
        <Typography className="soloEvent__form--input--label--link" variant="h6">{`calendapp.com/${username}/`}</Typography>
        <Box className="soloEvent__form--input--link--wrap">
            <input onChange={handleUserInput} name="eventLink"
                value={eventLink}
                className="soloEvent__form--input--link" 
                autoComplete="off"
                />
            <p className="soloEvent__error">{eventLinkError}</p>
        </Box>
    </Box>
)

export default EventLinkInput;