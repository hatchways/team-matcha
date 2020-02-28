import React from 'react';
import momentTZ from "moment-timezone";
import { Box, Typography } from '@material-ui/core';
import TimeSlotItem from '../TimeSlotItem/TimeSlotItem';

const TimeSlotMobileList = ({ date, timeslots, timezoneName, handleTimeSlotSelected, handleConfirmModal }) => {
    return (
        <Box className="calendarPage__timeslots--mobile">
            <Typography variant="h6" className="calendarPage__timeslots--mobile--title">{momentTZ(date).format('dddd, MMMM Do')}</Typography>
            <Box className="calendarPage__timeslots--mobile--list">
                {
                    timeslots.length > 0 
                    ? timeslots.map((timeslot, index) => 
                        (<TimeSlotItem 
                            daySelected={momentTZ(date).format('YYYY-MM-DD')}
                            timezoneName={timezoneName}
                            handleTimeSlotSelected={handleTimeSlotSelected} 
                            handleConfirmModal={handleConfirmModal} 
                            key={index} 
                            {...timeslot}
                        />))
                    : <p className="calendarPage__timeslots--mobile--msg">Select a day to get started</p>
                }
            </Box>
        </Box>
    )
};

export default TimeSlotMobileList;