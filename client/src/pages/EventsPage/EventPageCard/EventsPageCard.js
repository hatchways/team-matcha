import React from 'react';
import copy from 'clipboard-copy';
import { Button, Box, Typography } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import ScheduleIcon from '@material-ui/icons/Schedule';

const EventPageCard = ({ eventDuration, eventLink, eventName, eventType, eventColor }) => {
    return (
    <Box boxShadow={3} className="eventCard" borderTop={5} borderColor={eventColor} borderRadius={5} >
        <Box className="eventCard__col--settings">
            <SettingsIcon className="eventCard__settings" />
        </Box>
        <Box className="eventCard__col--text">
            <Typography variant="h6" className="eventCard__event--name">
                {eventName}
                <br/>
                <span className="eventCard__event--name--span">{eventType}</span>
            </Typography>
        </Box>
        <Box className="eventCard__col--link">
            <Box className="eventCard__event--icon">
                <ScheduleIcon className=""/>
                <Typography>
                    &nbsp;&nbsp;{eventDuration}
                </Typography>
            </Box>
            <Button 
                onClick={() => copy(eventLink)}
                className="eventCard__event--btn">COPY LINK</Button>
        </Box>
    </Box>
    )
};

export default EventPageCard;