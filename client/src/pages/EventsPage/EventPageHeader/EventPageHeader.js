// importing modules
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';

const EventPageHeader = ({public_id, name, ...props}) => (
    <Box className="eventPageHeader">
        <Box className="eventPageHeader__container">
            <Box className="eventPageHeader__profile">
                <img 
                    className="eventPageHeader__profile--img"
                    src={props.img} 
                    alt="user img" 
                />
                <Box className="eventPageHeader__profile--text">
                <Typography 
                    className="eventPageHeader__profile--text--name"
                    variant="body1">
                    {name}
                </Typography>
                <Typography 
                    className="eventPageHeader__profile--text--url"
                    variant="body1">
                    calendApp.com/{public_id}
                </Typography>
                </Box>
            </Box>
            <Button 
                className="eventPageHeader__btn"
                onClick={() => props.history.push('/events/event-types')}
            >
            + NEW EVENT TYPE
            </Button>
        </Box>
    </Box>
);

export default withRouter(EventPageHeader);
