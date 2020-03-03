import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import momentTZ from 'moment-timezone';
import UpcomingScheduleItemDropdown from './UpcomingScheduleItemDropdown/UpcomingScheduleItemDropdown';

const UpcomingScheduleItem = ({ date, color, start, end, participants, event, inviteeEmail, created, timezone }) => {
    const [active, setToggle] = useState(false);

    const toggle = () => {
        setToggle(!active);
    };

    return (
    <Box className="upcomingSchedule__item">
        <Box className="upcomingSchedule__item--date">
            <Typography variant="body1">
                {momentTZ(date).format('dddd, MMMM Do, YYYY')}
            </Typography>
        </Box>
        <Box className="upcomingSchedule__content">
            <Box className="upcomingSchedule__content--col1">
                <Box className="upcomingSchedule__content--color" style={{ backgroundColor: event.color }}></Box>
                <Box className="upcomingSchedule__content--time">{momentTZ(start).format('hh:mma')} - {momentTZ(end).format('hh:mma')}</Box>
            </Box>
            <Box className="upcomingSchedule__content--col2">
                <Typography className="upcomingSchedule__content--text">
                    {participants[0].name}<br/>
                    <span className="upcomingSchedule__content--text--span">
                    Event type:&nbsp;
                    </span>
                    {event.name}
                </Typography>
            </Box>
            <button onClick={toggle} className="upcomingSchedule__content--btn">
                {active ? <span>&#9662;</span> : <span>&#9656;</span> } Details 
            </button>
        </Box>
        {
            active ? (
                <UpcomingScheduleItemDropdown 
                    eventInviteeEmail={participants[0].email}
                    eventOriginallyScheduled={created}
                    eventInviteeTimezone={timezone}
                /> ) : null
        }
    </Box>
    );
};

export default UpcomingScheduleItem;