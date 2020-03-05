import React from 'react'
import momentTZ from "moment-timezone";
import { Button} from '@material-ui/core';

const TimeSlotItem = ({ hour, minute, handleConfirmModal, timezoneName, daySelected }) => {
    const hourFormatted = momentTZ((hour).toString(),'HH').format('HH'); // formatting integer to 24hr time
    const formattedTimeSlot24hr = momentTZ(`${hourFormatted}:${minute}`, 'HH:mm').format('HH:mm:ss'); // formatting time to reflect hour&minutes in 24hr format
    const dateSelected = `${daySelected}T${formattedTimeSlot24hr}`; // formats the date selected from the calendar
    const dateSelectedFormatted = momentTZ(dateSelected).tz(timezoneName).format('YYYY-MM-DDTHH:mm:ssZ');
    // const dynamicTimeSlot = momentTZ(dateSelected).tz(timezoneName).format('h:mm a');
    const dynamicTimeSlot = momentTZ(dateSelected).tz(timezoneName).format('h:mm a');
    return (
        <React.Fragment>
            <Button onClick={() => handleConfirmModal(dynamicTimeSlot, formattedTimeSlot24hr, dateSelectedFormatted)} className="calendarPage__timeslots--btn">{dynamicTimeSlot}</Button>
        </React.Fragment>
    )
}

export default TimeSlotItem;