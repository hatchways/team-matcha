import React from 'react'
import moment from 'moment';
import { Button} from '@material-ui/core';

const TimeSlotItem = ({ hour, minute, handleConfirmModal }) => {
    const hourFormatted = moment((hour).toString(),'HH').format('HH');
    const formattedTimeSlot = moment(`${hourFormatted}:${minute}`, 'HH:mm').format('h:mm a'); // formatted time to reflect 12hr
    const formattedTimeSlot24hr = moment(`${hourFormatted}:${minute}`, 'HH:mm').format('HH:mm:ss'); // formatted time to reflect 24hr
    return (
        <React.Fragment>
            <Button onClick={() => handleConfirmModal(formattedTimeSlot, formattedTimeSlot24hr)} className="calendarPage__timeslots--btn">{formattedTimeSlot}</Button>
        </React.Fragment>
    )
}

export default TimeSlotItem;