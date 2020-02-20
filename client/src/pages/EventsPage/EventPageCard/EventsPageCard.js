import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Button, Box, Typography, MenuItem, MenuList, Paper } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// import FileCopyIcon from '@material-ui/icons/FileCopy'; // use later
import SettingsIcon from '@material-ui/icons/Settings';
import ScheduleIcon from '@material-ui/icons/Schedule';

const EventPageCard = ({ eventDuration, eventLink, eventName, eventType, eventColor, eventId, handleRemoveEvent }) => {
    const [active, setToggle] = useState(false);
    const toggle = () => {
        setToggle(!active);
    };
    return (
    <Box boxShadow={3} className="eventCard" borderTop={5} borderColor={eventColor} borderRadius={5} >
        <Box className="eventCard__col--settings">
            <SettingsIcon onClick={toggle} className="eventCard__settings" />
            {active ? <span>&#9652;</span> : <span>&#9662;</span> }
            {active ? <Paper className="eventCard__col--settings--dropdown">
                <MenuList>
                    <MenuItem className="eventCard__col--settings--dropdown--item">
                        <EditIcon className="eventCard__col--settings--dropdown--icon"/>
                        Edit
                    </MenuItem>
                    <MenuItem onClick={() => handleRemoveEvent(eventId)} className="eventCard__col--settings--dropdown--item">
                        <DeleteIcon className="eventCard__col--settings--dropdown--icon"/>
                        Delete
                    </MenuItem>
                    {/*<MenuItem className="eventCard__col--settings--dropdown--item">
                        <FileCopyIcon className="eventCard__col--settings--dropdown--icon"/>
                        Clone
                    </MenuItem>
                    keep for later 
                    */}
                </MenuList>
            </Paper> : null }
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
                <Typography>&nbsp;&nbsp;{eventDuration}</Typography>
            </Box>
            <Button 
                onClick={() => copy(eventLink)}
                className="eventCard__event--btn"
            >COPY LINK</Button>
        </Box>
    </Box>
    )
};

export default EventPageCard;