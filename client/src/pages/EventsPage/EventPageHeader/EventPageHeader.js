// importing modules
import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';

const EventPageHeader = () => (
    <Box className="eventPageHeader">
        <Box className="eventPageHeader__container">
            <Box className="eventPageHeader__profile">
                <img 
                    className="eventPageHeader__profile--img"
                    src={`https://www.jetphotos.com/assets/img/user.png`} 
                    alt="user img" 
                />
                <Box className="eventPageHeader__profile--text">
                <Typography 
                    className="eventPageHeader__profile--text--name"
                    variant="body1">
                    John Doe
                </Typography>
                <Typography 
                    className="eventPageHeader__profile--text--url"
                    variant="body1">
                    calendApp.com/john-doe
                </Typography>
                </Box>
            </Box>
            <Button 
                className="eventPageHeader__btn"
            >
            + NEW EVENT TYPE
            </Button>
        </Box>
    </Box>
);

export default EventPageHeader;