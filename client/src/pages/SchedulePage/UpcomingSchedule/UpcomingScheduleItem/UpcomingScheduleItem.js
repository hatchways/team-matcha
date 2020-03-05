import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import momentTZ from 'moment-timezone';
import { localizeUtcTime } from '../../../../Utils/time-func';
import UpcomingScheduleItemDropdown from './UpcomingScheduleItemDropdown/UpcomingScheduleItemDropdown';

const UpcomingScheduleItem = ({ date, start, end, participants, event, created, timezone }) => {
    const [active, setToggle] = useState(false);

    const toggle = () => {
        setToggle(!active);
    };

    return (
    <Box className="upcomingSchedule__item">
        <Box className="upcomingSchedule__item--date">
            <Typography variant="body1">
                {momentTZ(start).format('dddd, MMMM Do, YYYY')}
            </Typography>
        </Box>
        <Box className="upcomingSchedule__content">
            <Box className="upcomingSchedule__content--col1">
                <Box className="upcomingSchedule__content--color" style={{ backgroundColor: event.color }}></Box>
                <Box className="upcomingSchedule__content--time">{localizeUtcTime(start)} - {localizeUtcTime(end)}</Box>
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