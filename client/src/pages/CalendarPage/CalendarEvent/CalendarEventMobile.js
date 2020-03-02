import React from 'react';
import { Box, Button, Typography, MenuItem, Select, } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PublicIcon from '@material-ui/icons/Public';

const CalendarEventMobile = ({ username, name, duration, location, timezoneName, timezonesArr, handleUserInput, handleCloseSlider }) => {
    return (
    <Box className="calendarPage__event">
        <Button onClick={handleCloseSlider} className="calendarPage__slider--btn"><ArrowBackIcon /></Button>
        <Typography variant="body1" className="calendarPage__event--username">{username}</Typography>
        <Typography variant="h5" className="calendarPage__event--eventname">{name}</Typography>
        <Typography variant="body2" className="calendarPage__event--duration"><ScheduleIcon />&nbsp;{duration}min</Typography>
        <Typography variant="body2" className="calendarPage__event--location"><LocationOnIcon />&nbsp;{location}</Typography>
        <Box className="calendarPage__select--wrap">
            <PublicIcon className="calendarPage__event--location"/>&nbsp;
            <Box className="calendarPage__select">
                <Select
                disableUnderline
                name="timezoneName"
                variant="outlined"
                value={timezoneName}
                onChange={handleUserInput}
                >
                    {
                        timezonesArr.length > 0 
                            ? timezonesArr.map((timezoneVal) => { 
                            return (
                                <MenuItem  key={timezoneVal} value={timezoneVal}> 
                                    <p className="calendarPage__select--text">
                                        {timezoneVal}
                                    </p>
                                </MenuItem> )
                            }) 
                            : null
                    }
                </Select>
            </Box>
        </Box>
    </Box>
    )
};

export default CalendarEventMobile;