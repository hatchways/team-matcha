import React from 'react'
import momentTZ from "moment-timezone";
import { Button} from '@material-ui/core';

const TimeSlotItem = ({ hour, minute, handleConfirmModal, timezoneName, daySelected }) => {
    const hourFormatted = momentTZ((hour).toString(),'HH').format('HH'); // formatting integer to 24hr time
    const formattedTimeSlot24hr = momentTZ(`${hourFormatted}:${minute}`, 'HH:mm').format('HH:mm:ss'); // formatting time to reflect hour&minutes in 24hr format
    const timezoneOffset = momentTZ.tz(timezoneName).format('Z'); // gets the utc timezone offset based on timezone selected
    const dateSelected = `${daySelected}T${formattedTimeSlot24hr}`; // formats the date selected from the calendar
    const dateToSubmit = `${daySelected}T${formattedTimeSlot24hr}${timezoneOffset}`; // formats the date for appointment submission
    const dynamicTimeSlot = momentTZ(dateSelected).tz(timezoneName).format('h:mm a'); // formats the date for dynamic slot rendering
    return (
        <React.Fragment>
            <Button onClick={() => handleConfirmModal(dynamicTimeSlot, formattedTimeSlot24hr, dateToSubmit)} className="calendarPage__timeslots--btn">{dynamicTimeSlot}</Button>
        </React.Fragment>
    )
}

export default TimeSlotItem;