import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import PastScheduleItemDropdown from './PastScheduleItemDropdown/PastScheduleItemDropdown';
const PastScheduleItem = ({ 
    eventDate, eventScheduledTime, eventColor,
    eventInvitee, eventInviteeEmail, eventName,
    eventInviteeTimezone, eventOriginallyScheduled }) => {
    const [active, setToggle] = useState(false);

    const toggle = () => {
        setToggle(!active);
    };

    return (
    <Box className="upcomingSchedule__item">
        <Box className="upcomingSchedule__item--date">
            <Typography variant="body1">
                {eventDate}
            </Typography>
        </Box>
        <Box className="upcomingSchedule__content">
            <Box className="upcomingSchedule__content--col1">
                <Box className="upcomingSchedule__content--color" style={{ backgroundColor: eventColor }}></Box>
                <Box className="upcomingSchedule__content--time">{ eventScheduledTime }</Box>
            </Box>
            <Box className="upcomingSchedule__content--col2">
                <Typography className="upcomingSchedule__content--text">
                    {eventInvitee}<br/>
                    <span className="upcomingSchedule__content--text--span">
                    Event type:&nbsp;
                    </span>
                    {eventName}
                </Typography>
            </Box>
            <button onClick={toggle} className="upcomingSchedule__content--btn">
                {active ? <span>&#9662;</span> : <span>&#9656;</span> } Details 
            </button>
        </Box>
        {
            active ? (
                <PastScheduleItemDropdown 
                    eventInviteeEmail={eventInviteeEmail}
                    eventOriginallyScheduled={eventOriginallyScheduled}
                    eventInviteeTimezone={eventInviteeTimezone}
                /> ) : null
        }
    </Box>
    );
};

export default PastScheduleItem;