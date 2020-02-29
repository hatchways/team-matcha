import React from 'react';
import momentTZ from "moment-timezone";
import { Box, Typography } from '@material-ui/core';
import { DatePicker } from "@material-ui/pickers";
import TimeSlotItem from '../TimeSlotItem/TimeSlotItem';

const Calendar = (
    { 
        date, maxDate, 
        timeslots, timezoneName,
        handleDisableDates, handleDateChange, 
        handleMobileDateChange, handleConfirmModal,
        handleTimeSlotSelected
    }) => {
    return (
    <Box className="calendarPage__datepicker">
        <Box className="calendarPage__datepicker--header">
            <Typography className="calendarPage__datepicker--header--title" variant="h6">Select a Date & Time</Typography>
        </Box>
        <Box className="calendarPage__datepicker--calendar">
        <div className="calendarPage__picker--desktop">
            <DatePicker
                autoOk
                disableToolbar
                variant="static"
                openTo="date"
                value={date}
                onChange={handleDateChange}
                orientation="landscape"
                disablePast
                maxDate={maxDate}
                shouldDisableDate={handleDisableDates}
            />
        </div>
        <div className="calendarPage__picker--mobile">
            <DatePicker
                autoOk
                disableToolbar
                variant="static"
                openTo="date"
                value={date}
                onChange={handleMobileDateChange}
                orientation="landscape"
                disablePast
                maxDate={maxDate}
                shouldDisableDate={handleDisableDates}
            />
        </div>
            <Box className="calendarPage__timeslots">
                <Typography variant="h6" className="calendarPage__timeslots--title">{momentTZ(date).format('dddd, MMMM Do')}</Typography>
                <Box className="calendarPage__timeslots--list">
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
                        : <p className="calendarPage__timeslots--msg">Select a day to get started</p>
                    }
                </Box>
            </Box>
        </Box>
    </Box>
    )
}

export default Calendar;